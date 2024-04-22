using MongoDB.Driver;

namespace art_gallery.Persistence;

public class MongoDbService
{
    private readonly IConfiguration _configuration;
    private readonly IMongoDatabase? _database;

    public IMongoDatabase? Database => _database;

    public MongoDbService(IConfiguration configuration)
    {
        _configuration = configuration;

        var connString = _configuration.GetConnectionString("MongoDB");
        var mongoUrl = MongoUrl.Create(connString);
        var mongoClient = new MongoClient(connString);

        var databaseName = _configuration["MongoDB:DatabaseName"];
        _database = mongoClient.GetDatabase(databaseName); 
    }
}