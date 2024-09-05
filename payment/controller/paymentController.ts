import Payment from "../model/paymentModel";
import { PaymentStatus } from "../model/paymentStatusEnum";
import { Types } from "mongoose";

class PaymentController {


    async newPayment(order_id: Types.ObjectId, user_id: String, amount: Number, payment_method: String, status: String) {

        try {

            const newPayment = new Payment({
                order_id: order_id,
                user_id: user_id,
                amount: amount,
                payment_method: payment_method,
                status: status
            });
            await Payment.create(newPayment);
        } catch (error) {
            throw error;
        }
    }


    async updatePaymentStatus(id:Types.ObjectId) {

      try{
            await Payment.findOneAndUpdate(
              { order_id: id },
              { $set: { status: PaymentStatus.Completed } }, 
              { new: true } 
            );
          }
       catch (error) {
        throw error;
      }
  }

  
  async cancelPayment(id:Types.ObjectId) {

    try{
          await Payment.findOneAndDelete({ order_id: id });
        }
     catch (error) {
      throw error;
    }
}

}

export const paymentController = new PaymentController();