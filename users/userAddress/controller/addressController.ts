import { Request, Response } from "express";
import Address from "../model/addressModel"

class AddressController {

    async addAddress(req: Request, res: Response) {
        
        try {
            const userId = req.userId;
            const newAddress = new Address({
                street_name: req.body.street_name,
                street_number: req.body.street_number,
                postal_code: req.body.postal_code,
                city: req.body.city,
                state: req.body.state,
                extra_details: req.body.extra_details,
                user_id: userId
            })

          const savedAddress = Address.create(newAddress);
          return res.status(201).send('Address succesfully saved');
        } catch (error) {
          res.status(500).json({ message: 'Server error', error });
        }
      }

      async getAllAddresses(req: Request, res: Response) {
        
        try {;
          const userId = req.userId;
          const addresses = await Address.find({user_id: userId}, 'street_name street_number postal_code city state extra_details');
          return res.status(201).json(addresses);
        } catch (error) {
          res.status(500).json({ message: 'Server error', error });
        }
      }


    async deleteAddressById(req: Request, res: Response) {
        const id = req.params.id;

        try {
            const userId = req.userId;
            const addressToDelete = await Address.findById(id);

            if(addressToDelete?.user_id != userId) {
                return res.status(404).send("Address not found");
            }

            await Address.findByIdAndDelete(id);
            res.status(200).send("Address succesfully deleted")
            }
         catch (error) {
            return res.status(400).json({ error: "User not found" });
        }
    }


    async getAddressById(req: Request, res: Response) {
        const id = req.params.id;
        try {

            const addressFound= await Address.findById(id, 'street_name street_number postal_code city state extra_details');

            if(addressFound!=undefined) {
                console.log(addressFound);
                 return res.status(200).json(addressFound);
                 
            } else {
                return res.status(500);
            }        
        }
         catch(error) {
            return res.status(500);
        }
  
    }  

    async updateAddressById(req: Request, res: Response) {
        const { id } = req.params;
        
        try {
          const addressToUpdate = await Address.findByIdAndUpdate(id, req.body);

          if(!addressToUpdate) {
            res.status(404).send(`Address with Id ${id} not found`)
          }

          return res.status(200).send(`Address with Id ${id} succesfully updated`)
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }
}
export const addressController = new AddressController();
