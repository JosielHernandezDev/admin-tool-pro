import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesUloadService {

  private uri!:string;
  constructor() { 
  }
  
  async updatePhoto(file:File,type:'users'|'medicos'|'hospitals',id:string){
    
    this.uri = `${environment.base_api}/upload/${type}/${id}`;
    try {
      const formData = new FormData();
      formData.append('image',file);

      const resp = await fetch(this.uri,{
        method:'put',
        headers:{
          'x-token':localStorage.getItem('token')||''
        },
        body:formData
      });

      const data = await resp.json();
      console.log("data",data);
      if(data.success){
        return data.newNameFile;
      }else{
        return false;
      }
    } catch (error) {
      
    }

  }
}
