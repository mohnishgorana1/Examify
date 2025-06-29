import app from "./app";
import { connectKafkaProducer } from "./kafka/kafkaClient";

const PORT = process.env.PORT || 5001;

// TODO: Uncomment below part if using kafka
// connectKafkaProducer().catch((err) => {
//   console.error("Kafka Producer Connection Error:", err);
// });


app.listen(PORT, () => {
  console.log(`🚀 AUTH service running on http://localhost:${PORT}`);
});
