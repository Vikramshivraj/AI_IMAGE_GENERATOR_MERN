import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    console.log("Searching image for:", prompt);

    const response = await axios.get(
      "https://api.pexels.com/v1/search",
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY,
        },
        params: {
          query: prompt,
          per_page: 1,
        },
      }
    );

    const imageUrl = response.data.photos[0]?.src?.large;

    if (!imageUrl) {
      return res.status(404).json({ message: "No image found" });
    }

    return res.status(200).json({
      photo: imageUrl, 
    });

  } catch (error) {
    console.error("PEXELS ERROR:", error.message);

    return res.status(500).json({
      message: "Error fetching image",
    });
  }
};