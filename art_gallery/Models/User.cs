using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace art_gallery.Models
{
    public class User
    {
        [BsonId]
        [BsonElement("_id")]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonIgnoreIfDefault]
        public string? Id { get; set; }

        [BsonElement("user_email")]
        [BsonRepresentation(BsonType.String)]
        public string Email { get; set; }

        [BsonElement("user_name")]
        [BsonRepresentation(BsonType.String)]
        public string Name { get; set; }

        [BsonElement("user_Role")]
        [BsonRepresentation(BsonType.String)]
        public string Role { get; set; }

        [BsonElement("created_date")]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime? CreatedDate { get; set; } = DateTime.UtcNow;

        [BsonElement("user_description")]
        [BsonRepresentation(BsonType.String)]
        public string? Description { get; set; }

        [BsonElement("user_passwordhash")]
        [BsonRepresentation(BsonType.String)]
        public string PasswordHash { get; set; }
    }
}
