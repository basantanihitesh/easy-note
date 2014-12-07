

import java.io.Serializable;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Document(collection = "notes")
public class Note implements Serializable {

	@Id
	private String id;
	
    private  String user_id;
    
    
	private  String title;
    
    private  String content;
    
    private  String notebookid;
    private  String created;
    
    private  String updated;
    private  String deleted;
    private boolean active;
    
    public Note() {
		super();
	}

	public Note(String id, String user_id, String title, String content,
			String notebookid, String created, String updated, String deleted,
			boolean active) {
		super();
		this.id = id;
		this.user_id = user_id;
		this.title = title;
		this.content = content;
		this.notebookid = notebookid;
		this.created = created;
		this.updated = updated;
		this.deleted = deleted;
		this.active = active;
	}

	public String getId() {
		return id;
	}

	public String getUser_id() {
		return user_id;
	}

	public String getTitle() {
		return title;
	}

	public String getContent() {
		return content;
	}

	public String getNotebookid() {
		return notebookid;
	}

	public String getCreated() {
		return created;
	}

	public String getUpdated() {
		return updated;
	}

	public String getDeleted() {
		return deleted;
	}

	public boolean isActive() {
		return active;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public void setNotebookid(String notebookid) {
		this.notebookid = notebookid;
	}

	public void setCreated(String created) {
		this.created = created;
	}

	public void setUpdated(String updated) {
		this.updated = updated;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
    
    
    
    
       
    
}