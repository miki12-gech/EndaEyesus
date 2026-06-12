export const mistereSelassieAbew = {
  id: "mistere_selassie_abew",
  title: "ምስጢረ ስላሴ",
  description: "ስለ ቅዱስ ሥላሴ ምሥጢር እና ሥላሴያዊ ሃይማኖት",
  lessons: [
    {
      id: "les_abew_1",
      title: "የሥላሴ አንድነትና ልዩነት",
      content: `<p>ቅዱስ ሥላሴ አንድ በሆነ መለኮት ሦስት አካላት ናቸው፤ እነርሱም <strong>አብ</strong>፣ <strong>ወልድ</strong> እና <strong>መንፈስ ቅዱስ</strong> ናቸው። አንድነት በመለኮት፣ ልዩነት በአካል ነው።</p>
      <p>ይህ ምሥጢር ከምክንያት በላይ ነው፤ በእምነት ብቻ መቀበል ይገባል።</p>`,
      inlineExplanations: [
        {
          id: "exp_abew_1",
          quotedText: "አንድ በሆነ መለኮት ሦስት አካላት",
          explanation: `<p>ይህ ማለት አብ፣ ወልድ እና መንፈስ ቅዱስ ፍጹም አንድ አምላክ ናቸው፣ ነገር ግን በአካላቸው የተለያዩ ናቸው። እንደ ሰው አንድ ዘር ሦስት ወንድሞች አይደለም፤ ይህ ምሳሌ ጉድለት አለበት። በተሻለ ምሳሌ፦ ፀሐይ ክብ፣ ብርሃን እና ሙቀት አንድ ሆነው ሦስት ናቸው።</p>`,
        },
      ],
    },
    // you can add more lessons here
  ],
  exam: {
    id: "exam_abew_1",
    questions: [
      {
        id: "q1",
        text: "የቅዱስ ሥላሴ አካላት ምን ምን ናቸው?",
        options: ["አብ ብቻ", "ወልድ ብቻ", "አብ፣ ወልድ፣ መንፈስ ቅዱስ", "መንፈስ ቅዱስ ብቻ"],
        correctAnswer: "አብ፣ ወልድ፣ መንፈስ ቅዱስ",
        points: 10,
      },
      {
        id: "q2",
        text: "ቅዱስ ሥላሴ በምን አንድ ነው?",
        options: ["በአካል", "በሥልጣን", "በመለኮት", "በዘመን"],
        correctAnswer: "በመለኮት",
        points: 10,
      },
    ],
    passingScore: 70,
  },
};