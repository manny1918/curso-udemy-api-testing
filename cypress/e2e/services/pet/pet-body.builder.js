import { CommonMethods } from '../common/common.methods';
import { PetBody } from "./pet-body";
import { PetMethods } from './pet.methods';

export class PetBodyBuilder {
  constructor() {
    this.body = new PetBody();
    this.body.category = {}
  }

  setPetId(petId) {
    this.body.id = petId;
    return this;
  }

  setCategoryId(catId){
    this.body.category.id = catId;
    return this
  }

  setCategory(catNamne){
    this.body.category.name = catNamne
    return this
  }

  setPetName(petName){
    this.body.name = petName
    return this
  }

  /**
   * 
   * @param {*} urls - array of photo Urls
   */
  setPhotoUrls(urls){
    this.body.photoUrls = urls
    return this
  }

/**
 * 
 * @param {*} tags - Array of pet tags
 */
  setTags(tags){
    this.body.tags=[]
    for(let i=0; i<tags.length; i++){
      this.body.tags.push({
        id: i,
        name: tags[i]
      })
    }
    return this
  }

  setStatus(status){
    this.body.status = status
    return this;
  }

  setBodyWithRandomData(petId){
    this.body.id = petId
    this.body.category.id = PetMethods.generateCategoryId()
    this.body.category.name = PetMethods.generateRandomCategory();
    this.body.name = CommonMethods.generateRandomString()
    this.body.photoUrls = [`https://${CommonMethods.generateRandomString()}`]
    this.body.tags = [{id: 0, name: CommonMethods.generateRandomString()}]
    this.body.status = PetMethods.generateRandomStatus();
    return this
  }

  build(){
    return this.body;
  }
}