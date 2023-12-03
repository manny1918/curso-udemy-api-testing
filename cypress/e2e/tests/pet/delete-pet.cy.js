import { PetBodyBuilder } from '../../services/pet/pet-body.builder';
import { PetMethods } from '../../services/pet/pet.methods';

describe('Delete pet', () => {
    it('Delete pet - happy path', () => {
        const petId = PetMethods.generatePetId()
        const body = new PetBodyBuilder().setBodyWithRandomData().setPetId(petId).build()

        cy.log('PRE-CONDITION :  Create a pet')
        PetMethods.addPet(body)

        cy.log('Delete pet')
        PetMethods.deletePet(petId, 'myApiKey').then(response=>{
            cy.log(JSON.stringify(response))
        })

        cy.log('Trying to retrieve the deleted pet')
        PetMethods.getPetById(petId, undefined, false).then(response=>{
            expect(response.status).to.eql(404)
        })
    });
});