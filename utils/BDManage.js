// function BDManage(phrase) {
//   let arrCurrentPhrases = localStorage.getItem("phrases") 
//                                           ? JSON.parse(localStorage.getItem("phrases")) : false;

//   if (arrCurrentPhrases) {
//     let phrasesCounter = localStorage.getItem("phrasesCounter");
//     console.log('currentData, currentPhrasesCounter', arrCurrentPhrases, phrasesCounter)

//     if (phrasesCounter >= 20) {
//       // BD MONGO STORAGE
//     }
//   } else {
//     localStorage.setItem("phrases", JSON.stringify([phrase]));
//     localStorage.setItem("phrasesCounter", 1);
//   }
// }