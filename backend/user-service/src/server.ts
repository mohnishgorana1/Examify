import app from "./app";
import { runKafkaConsumer } from "./kafka/kafkaConsumer";



const PORT = process.env.PORT || 5002;



// TODO: Uncomment below part if using kafka
// runKafkaConsumer().catch((err) => {
//   console.error("Kafka Consumer Error:", err);
// });

app.listen(PORT, () => {
  console.log(`🚀 USER service running on http://localhost:${PORT}`);
});
