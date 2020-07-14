using backend_kits.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace backend_kits.Repository
{
    public class KitsRepository: DbContext
    {

        public KitsRepository (DbContextOptions<KitsRepository> options) : base(options)
        {

        }
        public DbSet<KitsModel> KITS { get; set; }

    }
}
