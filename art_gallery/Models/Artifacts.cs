using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace art_gallery.Models
{
    public class Artifact
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        [BsonIgnoreIfDefault]
        public string? Id { get; set; }

        [BsonElement("artifact_name"), BsonRepresentation(BsonType.String)]
        public string Name { get; set; }

        [BsonElement("artifact_desc"), BsonRepresentation(BsonType.String)]
        public string? Description { get; set; }

        [BsonElement("artefact_style"), BsonRepresentation(BsonType.String)]
        public string? Style { get; set; }
        
        [BsonElement("artefact_artist"), BsonRepresentation(BsonType.String)]
        public string? Artist { get; set; }

        [BsonElement("image_id"), BsonRepresentation(BsonType.ObjectId)]
        [BsonIgnoreIfDefault]
        public string? ImageId { get; set; }
        
        [BsonIgnore] 
        public IFormFile? Image { get; set; } 
    }
}