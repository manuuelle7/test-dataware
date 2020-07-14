using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using backend_kits.Model;
using backend_kits.Repository;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace back_kits.Controllers
{
    [Route("api-kits")]
    [ApiController]
    public class KitsController : Controller
    {
        private readonly KitsRepository kitsRepository;
        private readonly string _connectionString;
        public KitsController(KitsRepository kitsRepository, IConfiguration configuration)
        {
            this.kitsRepository = kitsRepository;
            _connectionString = configuration.GetConnectionString("conexionServerLocal");

        }

        [Route("kits")]
        [HttpGet]
        public List<KitsModel> Get()
        {
            return kitsRepository.KITS.ToList();
        }

        [Route("kits/{id}", Name = "getKit")]
        [HttpGet]
        public async Task<KitsModel> Get(string id)
        {
            // var kit = kitsRepository.KITS.FirstOrDefault(k => k.ID_KITS.Equals(id));
            // return kit;
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("CONSULTA_KITS", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.Add(new SqlParameter("@BUSQUEDA_KITS", id));
                    KitsModel response = null;
                    await sql.OpenAsync();

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            response = MapToValue(reader);
                        }
                    }

                    return response;
                }
            }

        }

        #region Método POST
        [Route("kits")]
        [HttpPost]
        public ActionResult Post([FromBody] KitsModel kit)
        {
            try
            {
                KitsModel kits = new KitsModel();

                kits.ID_KITS = kit.ID_KITS;
                kits.NOMBRE = kit.NOMBRE;
                kits.DESCRIPCION = kit.DESCRIPCION;
                kits.COSTO_PUBLICO = new Decimal(25.5);
                kits.COSTO_DISTRIBUIDOR = new Decimal(25.5);
                kits.MINIMO_NECESARIO = 23;
                kits.STOCK = 13;

                // categoria.NOMBRE = recepcionDatos.nombre_cat;
                // categoria.DESCRIPCION = recepcionDatos.descripcion_cat;

                kitsRepository.KITS.Add(kits);
                // kitsRepository.CATEGORIA.Add(categoria);
                kitsRepository.SaveChanges();
                return Ok();
            }
            catch (Exception e)
            {
                Console.Write("Falló: " + e);
                return BadRequest();
            }

        }
        #endregion

        #region Método PATCH
        [Route("kits/{id}")]
        [HttpPatch]
        public ActionResult Patch(string id, [FromBody] KitsModel kit)
        {
            try
            {
                KitsModel kits = new KitsModel();
                kits.ID_KITS = id;
                kits.NOMBRE = kit.NOMBRE;
                kits.DESCRIPCION = kit.DESCRIPCION;
                kits.COSTO_PUBLICO = new Decimal(25.5);
                kits.COSTO_DISTRIBUIDOR = new Decimal(25.5);
                kits.MINIMO_NECESARIO = 23;
                kits.STOCK = 13;
                kitsRepository.Entry(kits).State = EntityState.Modified;
                kitsRepository.SaveChanges();
                return Ok();
            }
            catch (Exception e)
            {
                Console.Write("Falló: " + e);
                return BadRequest();
            }
        }
        #endregion

        #region Método DELETE
        [Route("kits/{id}")]
        [HttpDelete]
        public ActionResult Delete(string id)
        {
            Console.WriteLine(id);
            Console.WriteLine("Ese fue el ID");
            var kit = kitsRepository.KITS.FirstOrDefault(k => k.ID_KITS == id);
            Console.WriteLine(kit);
            if (kit != null)
            {
                kitsRepository.KITS.Remove(kit);
                kitsRepository.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        #endregion


        private KitsModel MapToValue(SqlDataReader reader)
        {
            return new KitsModel()
            {
                ID_KITS = reader["ID_KITS"].ToString(),
                NOMBRE = reader["NOMBRE"].ToString(),
                DESCRIPCION = reader["DESCRIPCION"].ToString()
            };
        }
    }

}
