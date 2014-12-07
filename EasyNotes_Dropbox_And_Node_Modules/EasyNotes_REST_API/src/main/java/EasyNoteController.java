

import javax.validation.Valid;

import org.apache.commons.codec.binary.Base64;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;



import com.temboo.Library.Dropbox.FileOperations.CreateFolder;
import com.temboo.Library.Dropbox.FileOperations.CreateFolder.CreateFolderInputSet;
import com.temboo.Library.Dropbox.FileOperations.CreateFolder.CreateFolderResultSet;
import com.temboo.Library.Dropbox.FileOperations.DeleteFileOrFolder;
import com.temboo.Library.Dropbox.FileOperations.DeleteFileOrFolder.DeleteFileOrFolderInputSet;
import com.temboo.Library.Dropbox.FileOperations.DeleteFileOrFolder.DeleteFileOrFolderResultSet;
import com.temboo.Library.Dropbox.FilesAndMetadata.UploadFile;
import com.temboo.Library.Dropbox.FilesAndMetadata.UploadFile.UploadFileInputSet;
import com.temboo.Library.Dropbox.FilesAndMetadata.UploadFile.UploadFileResultSet;
import com.temboo.Library.Dropbox.OAuth.FinalizeOAuth;
import com.temboo.Library.Dropbox.OAuth.InitializeOAuth;
import com.temboo.Library.Dropbox.OAuth.FinalizeOAuth.FinalizeOAuthInputSet;
import com.temboo.Library.Dropbox.OAuth.FinalizeOAuth.FinalizeOAuthResultSet;
import com.temboo.Library.Dropbox.OAuth.InitializeOAuth.InitializeOAuthInputSet;
import com.temboo.Library.Dropbox.OAuth.InitializeOAuth.InitializeOAuthResultSet;
import com.temboo.core.TembooSession;



@RestController
public class EasyNoteController {
	
	ApplicationContext ctx = new AnnotationConfigApplicationContext(SpringMongoConfig.class);
	MongoOperations mongoOperation = (MongoOperations) ctx.getBean("mongoTemplate");
	
	TembooSession session;
	final String DROPBOX_APPKEY = "nko2qsrvdy2k6xo";
	final String DROPBOX_APPKEYSECRET = "lgf16chgslrv699";
	String accessToken;
	String accessTokenSecret;
	{	
	try
	{
	
	
	session = new TembooSession("basantanihitesh", "myFirstApp", "e96402e009d04097811ef02c411c28e2");

	
	
	InitializeOAuth initializeOAuthChoreo = new InitializeOAuth(session);

	// Get an InputSet object for the choreo
	InitializeOAuthInputSet initializeOAuthInputs = initializeOAuthChoreo.newInputSet();

	// Set inputs
	initializeOAuthInputs.set_DropboxAppSecret(DROPBOX_APPKEYSECRET);
	initializeOAuthInputs.set_DropboxAppKey(DROPBOX_APPKEY);
	initializeOAuthInputs.set_ForwardingURL("http://localhost:3000");

	//Execute Choreo
	InitializeOAuthResultSet initializeOAuthResults = initializeOAuthChoreo.execute(initializeOAuthInputs);
	
	//Get Outputs
	String authURL = initializeOAuthResults.get_AuthorizationURL();
	String callbackId = initializeOAuthResults.get_CallbackID();
	String OAuthTokenSecret = initializeOAuthResults.get_OAuthTokenSecret();
	System.out.println("callbackId  "+callbackId);
	System.out.println("OAuthTokenSecret  "+OAuthTokenSecret);
	
	System.out.println("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"+authURL+"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
	
	 
	
	FinalizeOAuth finalizeOAuthChoreo = new FinalizeOAuth(session);

	// Get an InputSet object for the choreo
	FinalizeOAuthInputSet finalizeOAuthInputs = finalizeOAuthChoreo.newInputSet();

	// Set inputs
	finalizeOAuthInputs.set_CallbackID(callbackId);
	finalizeOAuthInputs.set_DropboxAppSecret(DROPBOX_APPKEYSECRET);
	finalizeOAuthInputs.set_OAuthTokenSecret(OAuthTokenSecret);
	finalizeOAuthInputs.set_DropboxAppKey(DROPBOX_APPKEY);
	
	

	// Execute Choreo
	FinalizeOAuthResultSet finalizeOAuthResults = finalizeOAuthChoreo.execute(finalizeOAuthInputs);
	accessToken = finalizeOAuthResults.get_AccessToken();
	accessTokenSecret = finalizeOAuthResults.get_AccessTokenSecret();
	
	System.out.println("accessToken  "+accessToken);
	System.out.println("accessTokenSecret  "+accessTokenSecret);
	
	
	
	}// end of try
	catch(Exception e)
	{}
	
	}
	//1. Create Notebook
		@RequestMapping(value="/api/v1/notebooks",method = RequestMethod.POST)
		@ResponseStatus(HttpStatus.CREATED)
		@ResponseBody
		public void createNotebook(@Valid @RequestBody Notebook notebook) throws Exception
		{	
						
			String nbname = notebook.getName();
			
			
			CreateFolder createFolderChoreo = new CreateFolder(session);

			// Get an InputSet object for the choreo
			CreateFolderInputSet createFolderInputs = createFolderChoreo.newInputSet();

			// Set inputs
			createFolderInputs.set_NewFolderName("/EasyNotes/"+nbname);
			createFolderInputs.set_AccessToken(accessToken);
			createFolderInputs.set_AppSecret(DROPBOX_APPKEYSECRET);
			createFolderInputs.set_AccessTokenSecret(accessTokenSecret);
			createFolderInputs.set_AppKey(DROPBOX_APPKEY);

			// Execute Choreo
			CreateFolderResultSet createFolderResults = createFolderChoreo.execute(createFolderInputs);
			System.out.println(createFolderResults.get_Response());
		}
		
		
		//2. Create Notes
				@RequestMapping(value="/api/v1/notes",method = RequestMethod.POST)
				@ResponseStatus(HttpStatus.CREATED)
				@ResponseBody
				public void createNotes(@Valid @RequestBody Note note) throws Exception
				{	
								
					String title = note.getTitle();
					String content = note.getContent();
					String nbid = note.getNotebookid();
					
					Notebook nbname = mongoOperation.findOne(new Query(Criteria.where("id").is(nbid)), Notebook.class);
					
					UploadFile uploadFileChoreo = new UploadFile(session);

					// Get an InputSet object for the choreo
					UploadFileInputSet uploadFileInputs = uploadFileChoreo.newInputSet();
					
					byte[] encodednotecontent = Base64.encodeBase64(content.getBytes());
					
					uploadFileInputs.set_Folder("/EasyNotes/"+nbname.getName());
					uploadFileInputs.set_AccessToken(accessToken);
					uploadFileInputs.set_AppSecret(DROPBOX_APPKEYSECRET);
					uploadFileInputs.set_FileName(title+".txt");
					uploadFileInputs.set_AccessTokenSecret(accessTokenSecret);
					uploadFileInputs.set_AppKey(DROPBOX_APPKEY);
					uploadFileInputs.set_FileContents(new String(encodednotecontent));

					// Execute Choreo
					UploadFileResultSet uploadFileResults = uploadFileChoreo.execute(uploadFileInputs);
				}
				
				//3. Delete notes
				@RequestMapping(value="/api/v1/notes",method = RequestMethod.DELETE)
				@ResponseStatus(HttpStatus.OK)
				@ResponseBody
				public void deleteNotes(@Valid @RequestBody Note note) throws Exception
				{	
								
					String title = note.getTitle();
					String nbid = note.getNotebookid();
					String deletepath;
					
					Notebook nbname = mongoOperation.findOne(new Query(Criteria.where("id").is(nbid)), Notebook.class);
					
					
					System.out.println(nbid);
					System.out.println(nbname.getName());
					System.out.println(title);
					
					if(title != null)
						 deletepath = "/EasyNotes/"+nbname.getName()+"/"+title+".txt";
					else
						deletepath = "/EasyNotes/"+nbname.getName();
					
					System.out.println(deletepath);
					
					
					DeleteFileOrFolder deleteFileOrFolderChoreo = new DeleteFileOrFolder(session);

					// Get an InputSet object for the choreo
					DeleteFileOrFolderInputSet deleteFileOrFolderInputs = deleteFileOrFolderChoreo.newInputSet();

					// Set inputs
					deleteFileOrFolderInputs.set_AppSecret(DROPBOX_APPKEYSECRET);
					deleteFileOrFolderInputs.set_AccessToken(accessToken);
					deleteFileOrFolderInputs.set_AccessTokenSecret(accessTokenSecret);
					deleteFileOrFolderInputs.set_AppKey(DROPBOX_APPKEY);
					deleteFileOrFolderInputs.set_Path(deletepath);

					// Execute Choreo
					DeleteFileOrFolderResultSet deleteFileOrFolderResults = deleteFileOrFolderChoreo.execute(deleteFileOrFolderInputs);
				}

}