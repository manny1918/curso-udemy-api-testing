import { CommonData } from "../common/common.data";
import { PetBodyBuilder } from './pet-body.builder';

export class PetMethods {
  static addPet(body, headers = CommonData.header) {
    return cy.request({
      method: "POST",
      url: "/pet",
      headers: headers,
      body: body,
    });
  }

  static updatePet(body, headers = CommonData.header) {
    return cy.request({
      method: "PUT",
      url: "/pet",
      headers: headers,
      body: body,
    });
  }

  static getPetById(petId, headers = CommonData.header, failOnStatusCode = true){
    return cy.request({
      method: 'GET',
      url: `/pet/${petId}`,
      headers: headers,
      failOnStatusCode: failOnStatusCode
    })
  }

  static getPetsByStatus(status, headers = CommonData.header){
    return cy.request({
      method: 'GET',
      url: `/pet/findByStatus?status=${status}`,
      headers: headers
    })
  }

  static deletePet(petId, apiKey){
    return cy.request({
      method: 'DELETE',
      url: `/pet/${petId}`,
      headers: {'api_key': apiKey}
    })
  }

  static generatePetId() {
    return Math.floor(Math.random() * 3000 + 700);
  }

  static generateCategoryId() {
    return Math.floor(Math.random() * 100 + 0);
  }

  static generateRandomCategory() {
    const arr = ["birds", "cats", "dogs", "rabbits", "guinea pigs", "fish"];
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
  }

  static generateRandomStatus() {
    const arr = ["available", "pending", "sold"];
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
  }

  static createAvailablePet(petId){
    const body = new PetBodyBuilder().setBodyWithRandomData().setStatus('available').setPetId(petId).build();
    return this.addPet(body);
  }

  static createSoldPet(petId){
    const body = new PetBodyBuilder().setBodyWithRandomData().setStatus('sold').setPetId(petId).build();
    return this.addPet(body);
  }

  static createPendingPet(petId){
    const body = new PetBodyBuilder().setBodyWithRandomData().setStatus('pending').setPetId(petId).build();
    return this.addPet(body);
  }

  static verifyPetsListStatus(petList, status){
    let differentStatusFound = false;
    petList.forEach(pet=>{
      if(pet.status!=status){
        differentStatusFound=true;
      }
    })
    expect(differentStatusFound).to.eql(false)
  }

  static verifyPetIdIncludedInTheList(petList, petId){
    let petFound = false;
    petList.forEach(pet=>{
      if(pet.id==petId){
        petFound = true;
      }
    })
    expect(petFound).to.eql(true)
  }

  static verifyPetIdNotIncludedInTheList(petList, petId){
    let petFound = false;
    petList.forEach(pet=>{
      if(pet.id==petId){
        petFound = true
      }
    })
    expect(petFound).to.eql(false)
  }
}
