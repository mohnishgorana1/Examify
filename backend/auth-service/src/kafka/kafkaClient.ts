import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId: "auth-service",
    brokers: ["localhost:9092"],
})

export const kafkaProducer = kafka.producer();


export const connectKafkaProducer = async () => {
    await kafkaProducer.connect();
    console.log("✅ Kafka Producer Connected (Auth Service)")
}