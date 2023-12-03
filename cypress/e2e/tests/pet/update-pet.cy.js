import { CommonMethods } from '../../services/common/common.methods';
import { PetBodyBuilder } from '../../services/pet/pet-body.builder';
import { PetMethods } from '../../services/pet/pet.methods';

describe('Update pet', () => {
    it('Update pet - happy path', () => {
        const petId = PetMethods.generatePetId();
        const categotyId = PetMethods.generateCategoryId();
        const category = PetMethods.generateRandomCategory();
        const petName = CommonMethods.generateRandomString()
        const photoUls = [`https://${CommonMethods.generateRandomString()}.png`];
        const tags = CommonMethods.generateRandomString();
        const status = PetMethods.generateRandomStatus()
        const body = new PetBodyBuilder().setBodyWithRandomData(petId).build();
        const updatedBody = new PetBodyBuilder().setPetId(petId).setCategoryId(categotyId).setCategory(category).setPetName(petName).setPhotoUrls(photoUls).setTags([tags]).setStatus(status).build()

        cy.log('PRE-CONDITION :  Create a pet')
        PetMethods.addPet(body)

        cy.log('Sending update pet request')
        PetMethods.updatePet(updatedBody).then(response=>{
            expect(response.status).to.eql(200)
            expect(response.body.id).to.eql(petId)
            expect(response.body.category.id).to.eql(categotyId)
            expect(response.body.category.name).to.eql(category)
            expect(response.body.name).to.eql(petName)
            expect(response.body.tags[0].id).to.eql(0)
            expect(response.body.tags[0].name).to.eql(tags)
            expect(response.body.status).to.eql(status)
        })
    });
});