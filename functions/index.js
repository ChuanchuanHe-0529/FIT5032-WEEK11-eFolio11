const {onRequest} = require("firebase-functions/v2/https");
const {setGlobalOptions} = require("firebase-functions/v2");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

setGlobalOptions({maxInstances: 10});


exports.countBooks = onRequest((request, response) => {
  cors(request, response, async () => {
    try {
      const snapshot = await admin
          .firestore()
          .collection("books")
          .get();

      response.status(200).json({
        count: snapshot.size,
      });
    } catch (error) {
      console.error("Error getting book count:", error);

      response.status(500).json({
        error: "Unable to get book count",
      });
    }
  });
});


exports.getAllBooks = onRequest((request, response) => {
  cors(request, response, async () => {
    try {
      const snapshot = await admin
          .firestore()
          .collection("books")
          .get();

      const books = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      response.status(200).json(books);
    } catch (error) {
      console.error("Error getting books:", error);

      response.status(500).json({
        error: "Unable to get books",
      });
    }
  });
});
