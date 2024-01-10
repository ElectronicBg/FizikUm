﻿using Duende.IdentityServer.EntityFramework.Options;
using FizikUm.Models;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace FizikUm.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public DbSet<Resource> Resources { get; set; }
        public DbSet<SubjectCategory> SubjectCategories { get; set; }
        public DbSet<Classroom> Classrooms { get; set; }

        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {

        }
    }
}