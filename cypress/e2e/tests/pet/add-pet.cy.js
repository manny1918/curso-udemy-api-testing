const { CommonData } = require("../../services/common/common.data");
const { CommonMethods } = require('../../services/common/common.methods');
const { PetBodyBuilder } = require("../../services/pet/pet-body.builder");
const { PetMethods } = require("../../services/pet/pet.methods");

describe("Add pet", () => {
  const petId = PetMethods.generatePetId();
  const categotyId = PetMethods.generateCategoryId();
  const category = PetMethods.generateRandomCategory();
  const petName = CommonMethods.generateRandomString()
  const photoUls = [`https://${CommonMethods.generateRandomString()}.png`];
  const tags = CommonMethods.generateRandomString();
  const status = PetMethods.generateRandomStatus()

  const petBody = new PetBodyBuilder()
    .setPetId(petId)
    .setCategoryId(categotyId)
    .setCategory(category)
    .setPetName(petName)
    .setPhotoUrls(photoUls)
    .setTags([tags])
    .setStatus(status)
    .build();
  it("Add pet - happy path", () => {
    PetMethods.addPet(petBody).then((response) => {
        expect(response.status).to.eql(200)
        expect(response.body.id).to.eql(petId)
        expect(response.body.category.id).to.eql(categotyId)
        expect(response.body.category.name).to.eql(category)
        expect(response.body.name).to.eql(petName)
        expect(response.body.tags[0].id).to.eql(0)
        expect(response.body.tags[0].name).to.eql(tags)
        expect(response.body.status).to.eql(status)
    });
  });
});
