using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend_kits.Model
{
    public class KitsModel
    {
        [Key]
        public string ID_KITS { get; set; }
        public string NOMBRE { get; set; }
        public string DESCRIPCION { get; set; }
        public decimal COSTO_DISTRIBUIDOR { get; set; }
        public decimal COSTO_PUBLICO { get; set; }
        public int MINIMO_NECESARIO { get; set; }
        public int STOCK { get; set; }
    }
}
