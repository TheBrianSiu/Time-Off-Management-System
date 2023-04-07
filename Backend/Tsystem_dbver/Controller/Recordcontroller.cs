using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Tsystem_dbver.Models;
using System;


namespace Tsystem_dbver.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class RecordController : ControllerBase
    {
        private readonly string _connectionString;

        public RecordController(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("RecordContext");
        }

        [HttpGet]
        [Route("get/ptorecords")]
        public async Task<ActionResult> Getallpto(CommandType commandType)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = connection.CreateCommand())
                {
                    command.Connection = connection;
                    command.CommandType = CommandType.Text;
                    command.CommandText = "SELECT Top 50 * FROM RECORDS WHERE PTO = 1";

                    using (var reader = command.ExecuteReader())
                    {
                        var lists = new List<Record>();
                        while (await reader.ReadAsync())
                        {
                            var list = new Record
                            {
                                empid = reader.GetInt64("empid"),
                                Firstname = reader.GetString("firstname"),
                                Lastname = reader.GetString("lastname"),
                                begindate = reader.GetDateTime("begindate"),
                                enddate = reader.GetDateTime("enddate"),
                                hours = reader.GetDouble("hours"),
                                pto = reader.GetBoolean("pto"),
                                message = reader.GetString("message"),
                            };
                            lists.Add(list);
                        }
                        return Ok(lists);
                    }
                }
            }


        }

        [HttpGet]
        [Route("get/allrecords")]
        public async Task<ActionResult> Getallrecords(CommandType commandType)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using (var command = connection.CreateCommand())
                {
                    command.Connection = connection;
                    command.CommandType = CommandType.Text;
                    command.CommandText = "SELECT Top 50 * FROM RECORDS";

                    using (var reader = command.ExecuteReader())
                    {
                        var lists = new List<Record>();
                        while (await reader.ReadAsync())
                        {
                            var list = new Record
                            {
                                empid = reader.GetInt64("empid"),
                                Firstname = reader.GetString("firstname"),
                                Lastname = reader.GetString("lastname"),
                                begindate = reader.GetDateTime("begindate"),
                                enddate = reader.GetDateTime("enddate"),
                                hours = reader.GetDouble("hours"),
                                pto = reader.GetBoolean("pto"),
                                sick = reader.GetBoolean("sick"),
                                message = reader.GetString("message"),
                            };
                            lists.Add(list);
                        }
                        return Ok(lists);
                    }
                }
            }


        }

        [HttpGet]
        [Route("get/sickrecords")]
        public async Task<ActionResult> Getallsickleave(CommandType commandType)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using(var command = connection.CreateCommand())
                {
                    command.Connection = connection;
                    command.CommandType = CommandType.Text;
                    command.CommandText = "SELECT TOP 50 * FROM RECORDS WHERE SICK = 1";

                    using(var reader = command.ExecuteReader())
                    {
                        var lists = new List<Record>();
                        while (await reader.ReadAsync()) {
                            var list = new Record
                            {
                                empid = reader.GetInt64("empid"),
                                Firstname = reader.GetString("firstname"),
                                Lastname = reader.GetString("lastname"),
                                begindate = reader.GetDateTime("begindate"),
                                enddate = reader.GetDateTime("enddate"),
                                hours = reader.GetDouble("hours"),
                                sick = reader.GetBoolean("sick"),
                                message = reader.GetString("message"),
                            };
                            lists.Add(list);
                        }
                        return Ok(lists);
                    }
                }
            }

           
        }

        [HttpPost]
        [Route("add/records")]
        [Consumes("application/json")]
        public async Task<ActionResult> CreateRecord([FromBody] Record record, CommandType commandType)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    connection.Open();

                    int rowAffected2 =0, rowAffected3 =0;

                    SqlCommand command = new SqlCommand("INSERT INTO Records (empid, Firstname, Lastname, begindate, enddate, hours, pto, sick, message) VALUES (@empid, @Firstname, @Lastname, @begindate, @enddate, @hours, @pto, @sick, @message)", connection);

                    command.CommandType = CommandType.Text;
                    command.Parameters.AddWithValue("@empid", record.empid);
                    command.Parameters.AddWithValue("@Firstname", record.Firstname);
                    command.Parameters.AddWithValue("@Lastname", record.Lastname);
                    command.Parameters.AddWithValue("@begindate", record.begindate);
                    command.Parameters.AddWithValue("@enddate", record.enddate);
                    command.Parameters.AddWithValue("@hours", record.hours);
                    command.Parameters.AddWithValue("@pto", record.pto);
                    command.Parameters.AddWithValue("@sick", record.sick);
                    command.Parameters.AddWithValue("@message", record.message);

                    if (record.pto == true)
                    {
                        SqlCommand command2 = new SqlCommand("UPDATE EMPLOYEES SET PTO_HOURS = PTO_HOURS - @HOURS WHERE ID = @EMPID", connection);
                        command2.CommandType = CommandType.Text;
                        command2.Parameters.AddWithValue("@empid", record.empid);
                        command2.Parameters.AddWithValue("@hours", record.hours);
                        rowAffected2 = command2.ExecuteNonQuery();
                    }
                    if (record.sick == true)
                    {
                        SqlCommand command3 = new SqlCommand("UPDATE EMPLOYEES SET SICK_HOURS = SICK_HOURS - @HOURS WHERE ID = @EMPID", connection);
                        command3.CommandType = CommandType.Text;
                        command3.Parameters.AddWithValue("@empid", record.empid);
                        command3.Parameters.AddWithValue("@hours", record.hours);
                        rowAffected3 = command3.ExecuteNonQuery();
                    }

                    int rowsAffected = command.ExecuteNonQuery();

                    if (rowsAffected == 1 && (rowAffected2 == 1 || rowAffected3 == 1))
                    {
                        return Ok();
                    }
                    else
                    {
                        return BadRequest("Record creation failed.");
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        [Route("records/{id}")]
        public async Task<ActionResult> GetRecord(int id)
        {
            using(var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                using(var command = connection.CreateCommand())
                {
                    command.Connection= connection;
                    command.CommandType = CommandType.Text;
                    command.CommandText = "SELECT * FROM RECORDS WHERE ID =@ID";

                    command.Parameters.AddWithValue("@id", id);

                    using (var reader = command.ExecuteReader())
                    {
                        var lists = new List<Record>();
                        while(await reader.ReadAsync())
                        {
                            var record = new Record
                            {
                                empid = reader.GetInt64("empid"),
                                Firstname = reader.GetString("firstname"),
                                Lastname = reader.GetString("lastname"),
                                begindate = reader.GetDateTime("begindate"),
                                enddate = reader.GetDateTime("enddate"),
                                hours = reader.GetDouble("hours"),
                                pto = reader.GetBoolean("pto"),
                                sick = reader.GetBoolean("sick"),
                                message = reader.GetString("message"),
                            };
                            lists.Add(record);
                        }
                        return Ok(lists);
                    }

                }
            }
        }
    }

    }

