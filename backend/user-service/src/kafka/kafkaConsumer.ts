import { Kafka } from "kafkajs";
import { registerUser } from "../actions/userActions";
import { User } from "../models/user.model";

const kafka = new Kafka({
  clientId: "user-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "user-service-group" });

export const runKafkaConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "user_registered",
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const userData = JSON.parse(message.value?.toString() || "{}");
      console.log("📥 Received event: ", userData);
      console.log("okay success now insert data to DB");
      registerUser(
        userData.userId,
        userData.name,
        userData.email,
        userData.phone,
        userData.dob,
        userData.role,
        userData.isVerified
      );
    },
  });

  console.log("✅ Kafka Consumer Connected (User Service)");
};
