using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace art_gallery.Models
{
    public class Artist
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        [BsonIgnoreIfDefault]
        public string? Id { get; set; }

        [BsonElement("artist_name"), BsonRepresentation(BsonType.String)]
        public string Name { get; set; }

        [BsonElement("artist_bio"), BsonRepresentation(BsonType.String)]
        public string? Bio { get; set; }

        [BsonElement("artist_style"), BsonRepresentation(BsonType.String)]
        public string? Style { get; set; }
        
        [BsonElement("artist_contributions"), BsonRepresentation(BsonType.Int32)]
        public int? Contributions { get; set; }

        [BsonElement("image_id"), BsonRepresentation(BsonType.ObjectId)]
        [BsonIgnoreIfDefault]
        public string? ImageId { get; set; }
        
        [BsonIgnore] 
        public IFormFile? Image { get; set; } 
    }
}