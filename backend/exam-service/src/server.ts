import app from "./app";
// import { connectKafkaProducer } from "./kafka/kafkaClient";

const PORT = process.env.PORT || 5003;


// connectKafkaProducer().catch((err) => {
//   console.error("Kafka Producer Connection Error:", err);
// });


app.listen(PORT, () => {
  console.log(`🚀 Exam service running on http://localhost:${PORT}`);
});
