

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.mongodb.DB;
import com.mongodb.MongoClient;

/**
 * Spring MongoDB configuration file
 * 
 */
@Configuration
public class SpringMongoConfig{

	public @Bean
	MongoTemplate mongoTemplate() throws Exception {
		
		
		MongoClient mongoClient = new MongoClient("ds049150.mongolab.com:49150");
		DB db = mongoClient.getDB("project18");
		boolean auth = db.authenticate("project18user", "project18".toCharArray());
		
		MongoTemplate mongoTemplate = new MongoTemplate(mongoClient,"project18");
		return mongoTemplate;
		
	}
		
}