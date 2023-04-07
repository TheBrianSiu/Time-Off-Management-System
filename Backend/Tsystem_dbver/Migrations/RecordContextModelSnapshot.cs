﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Tsystem_dbver.Models;

#nullable disable

namespace Tsystem_dbver.Migrations
{
    [DbContext(typeof(RecordContext))]
    partial class RecordContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Tsystem_dbver.Models.Record", b =>
                {
                    b.Property<long>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("id"));

                    b.Property<string>("Firstname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Lastname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("begindate")
                        .HasColumnType("datetime2");

                    b.Property<long>("empid")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("enddate")
                        .HasColumnType("datetime2");

                    b.Property<double>("hours")
                        .HasColumnType("float");

                    b.Property<string>("message")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("pto")
                        .HasColumnType("bit");

                    b.Property<bool>("sick")
                        .HasColumnType("bit");

                    b.HasKey("id");

                    b.ToTable("Records");
                });
#pragma warning restore 612, 618
        }
    }
}