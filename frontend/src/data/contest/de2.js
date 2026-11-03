// Nội dung từ docs/Bo De Thi Thu 2 Vuon Ra The Gioi.markdown — định dạng xem contest/index.js

const TOPICS = [
  {
    id: 'heroes',
    english: 'Vietnamese Heroes, History & Landmarks',
    vietnamese: 'Danh nhân, Lịch sử & Địa danh',
    questions: [
      {
        question: 'Who is the national hero that defeated the Mongol invaders on the Bach Dang River in 1288?',
        options: ['Tran Hung Dao', 'Ngo Quyen', 'Le Loi', 'Quang Trung'],
        answer: 0,
        explanation: 'Hưng Đạo Đại Vương Trần Quốc Tuấn.',
      },
      {
        question:
          'Which famous ancient town in Quang Nam province is known for its yellow houses and glowing lanterns at night?',
        options: ['Sa Pa Town', 'Hoi An Ancient Town', 'Da Lat City', 'Hue Imperial City'],
        answer: 1,
        explanation: 'Phố cổ Hội An.',
      },
      {
        question: 'What is the traditional musical instrument made of bamboo tubes in the Central Highlands of Vietnam?',
        options: ['Dan Tranh', 'Gong (Cồng chiêng)', "T'rung", 'Dan Bau'],
        answer: 2,
        explanation: "Đàn T'rưng làm bằng ống tre, nhạc cụ đặc trưng của Tây Nguyên.",
      },
      {
        question:
          'Which hero of the Ho Chi Minh Young Pioneer Organization famously sacrificed his life to save his comrades during the resistance war?',
        options: ['Kim Dong', 'Le Van Thiem', 'Nguyen Van Troi', 'Vo Thi Sau'],
        answer: 0,
        explanation: 'Anh hùng Kim Đồng – đội viên đầu tiên của Đội.',
      },
      {
        question:
          'What is the name of the famous imperial capital of Vietnam during the Nguyen Dynasty, located in Central Vietnam?',
        options: ['Hanoi', 'Hue', 'Ho Chi Minh City', 'Hai Phong'],
        answer: 1,
        explanation: 'Cố đô Huế.',
      },
      {
        question: 'Which flower is chosen as the national flower of Vietnam?',
        options: ['Rose', 'Lotus (Hoa sen)', 'Sunflower', 'Orchid'],
        answer: 1,
        explanation: 'Hoa sen là quốc hoa của Việt Nam.',
      },
      {
        question: 'What is the highest peak in Vietnam, often called the "Roof of Indochina"?',
        options: ['Lang Biang', 'Fansipan', 'Ba Den', 'Bach Ma'],
        answer: 1,
        explanation: 'Đỉnh Fansipan cao 3.147 m.',
      },
      {
        question: "The Temple of Literature (Văn Miếu - Quốc Tử Giám) in Hanoi is known as Vietnam's first what?",
        options: ['University (Trường đại học đầu tiên)', 'Museum', 'Royal Palace', 'Military Base'],
        answer: 0,
        explanation: 'Trường đại học đầu tiên của Việt Nam.',
      },
      {
        question: 'Which traditional Vietnamese hat is conical and often paired with the Ao Dai?',
        options: ['Beret', 'Conical hat (Nón lá)', 'Cowboy hat', 'Helmet'],
        answer: 1,
        explanation: 'Nón lá.',
      },
      {
        question: 'On what date is the Founding Day of the Ho Chi Minh Young Pioneer Organization celebrated?',
        options: ['March 26', 'May 15 (Ngày thành lập Đội TNTP Hồ Chí Minh)', 'September 2', 'June 1'],
        answer: 1,
        explanation: 'Đội TNTP Hồ Chí Minh thành lập ngày 15 tháng 5 năm 1941.',
      },
    ],
  },
  {
    id: 'global',
    english: 'Global Citizenship & Green Environment',
    vietnamese: 'Công dân toàn cầu & Môi trường xanh',
    questions: [
      {
        question: 'What is a "carbon footprint"?',
        options: [
          'The size of your shoes',
          'The amount of carbon dioxide released into the atmosphere by human activities',
          'A drawing on the wall',
          'A type of green plant',
        ],
        answer: 1,
        explanation: 'Lượng khí thải carbon do hoạt động của con người thải ra môi trường.',
      },
      {
        question: 'Which energy source uses the power of wind to generate electricity?',
        options: ['Hydropower', 'Wind power (Năng lượng gió)', 'Coal power', 'Nuclear power'],
        answer: 1,
        explanation: 'Năng lượng gió.',
      },
      {
        question: 'Why should we turn off the tap while brushing our teeth?',
        options: [
          'To waste water',
          'To save water resources (Tiết kiệm nguồn nước)',
          'To make the faucet work faster',
          'To clean the bathroom',
        ],
        answer: 1,
        explanation: 'Tiết kiệm nguồn nước.',
      },
      {
        question: 'What does a global citizen (công dân toàn cầu) need to possess?',
        options: [
          'Good communication skills, cultural understanding, and foreign languages',
          'Only knowledge of their own hometown',
          'No respect for others',
          'A lazy attitude',
        ],
        answer: 0,
        explanation: 'Kỹ năng giao tiếp tốt, hiểu biết văn hóa và ngoại ngữ.',
      },
      {
        question: 'Which action is best for reducing plastic waste when going shopping?',
        options: [
          'Using single-use nylon bags every time',
          'Using cloth bags or reusable bags (Sử dụng túi vải/túi tái sử dụng)',
          'Throwing items on the street',
          'Buying more bottled water',
        ],
        answer: 1,
        explanation: 'Dùng túi vải hoặc túi tái sử dụng.',
      },
      {
        question: 'What is the purpose of planting trees around schools and houses?',
        options: [
          'To block sunlight completely',
          'To provide fresh air, shade, and protect the environment',
          'To create garbage',
          'To make noise',
        ],
        answer: 1,
        explanation: 'Cây xanh cho không khí trong lành, bóng mát và bảo vệ môi trường.',
      },
      {
        question: 'Which animal in Vietnam is critically endangered and known as the "Asian unicorn"?',
        options: ['Tiger', 'Saola', 'Elephant', 'Monkey'],
        answer: 1,
        explanation: 'Con sao la.',
      },
      {
        question: 'What is "Upcycling" (Tái chế sáng tạo)?',
        options: [
          'Throwing away old things',
          'Turning waste materials or useless products into new, useful items of better quality',
          'Burning plastic waste',
          'Buying new clothes every day',
        ],
        answer: 1,
        explanation: 'Biến rác thải, đồ bỏ đi thành đồ vật mới, hữu ích và chất lượng hơn.',
      },
    ],
  },
  {
    id: 'school',
    english: 'English Communication & School Life',
    vietnamese: 'Giao tiếp tiếng Anh & Đời sống học đường',
    questions: [
      {
        question: 'How do you politely interrupt someone to ask a question in English?',
        options: ['"Shut up and listen to me!"', '"Excuse me, may I ask a question?"', '"I don\'t care."', '"Go away."'],
        answer: 1,
        explanation: 'Xin lỗi, cho phép tôi hỏi một câu được không?',
      },
      {
        question: 'Complete the sentence: "Teamwork makes the ______ work."',
        options: ['dream', 'problem', 'lazy', 'heavy'],
        answer: 0,
        explanation: 'Thành ngữ: Teamwork makes the dream work – sức mạnh tập thể.',
      },
      {
        question: "If you want to praise your friend's excellent presentation, what should you say?",
        options: ['"That was terrible."', '"Fantastic job! You did great!"', '"I hate it."', '"Speak slower."'],
        answer: 1,
        explanation: 'Tuyệt vời! Bạn làm tốt lắm!',
      },
      {
        question: 'What is the English name for "Khăn quàng đỏ" (Red scarf worn by Young Pioneers)?',
        options: ['Red ribbon', 'Red scarf', 'Red flag', 'Red tie'],
        answer: 1,
        explanation: 'Khăn quàng đỏ.',
      },
      {
        question: 'Complete the sentence: "Children are the future leaders ______ the world."',
        options: ['in', 'of', 'at', 'on'],
        answer: 1,
        explanation: 'Leaders of the world – những người lãnh đạo tương lai của thế giới.',
      },
      {
        question: 'Which action shows respect to your teachers and international friends?',
        options: [
          'Smiling, listening carefully, and greeting politely',
          'Turning your back when they speak',
          'Interrupting loudly',
          'Looking at your phone all day',
        ],
        answer: 0,
        explanation: 'Mỉm cười, chăm chú lắng nghe và chào hỏi lễ phép.',
      },
      {
        question: 'What does the phrase "Step out of your comfort zone" mean?',
        options: [
          'Staying in bed all day',
          'Trying new challenges and experiences to grow',
          'Being afraid of changes',
          'Giving up easily',
        ],
        answer: 1,
        explanation: 'Bước ra khỏi vùng an toàn – thử thách mới để trưởng thành.',
      },
      {
        question: 'Choose the correct question for this answer: "I live in Da Nang City, a coastal city in Central Vietnam."',
        options: ['Where do you live?', 'What is your hobby?', 'How old are you?', 'When is your birthday?'],
        answer: 0,
        explanation: 'Câu trả lời nói về nơi ở nên câu hỏi là "Where do you live?" (Bạn sống ở đâu?).',
      },
      {
        question: 'What should you prepare when doing a video clip for the contest?',
        options: [
          'A clear script, good lighting, confident voice, and cultural highlights',
          'Speaking as fast as possible without a plan',
          'Wearing casual sleepwear',
          'Recording in a very noisy place',
        ],
        answer: 0,
        explanation: 'Kịch bản rõ ràng, đủ ánh sáng, giọng nói tự tin và nét văn hóa nổi bật.',
      },
      {
        question: 'Complete the slogan of Ho Chi Minh Young Pioneer Organization: "Sẵn sàng!" in English is:',
        options: ['Ready!', 'Be Prepared!', 'Go ahead!', 'Fight!'],
        answer: 1,
        explanation: 'Khẩu hiệu của Đội: Sẵn sàng – Be Prepared!',
      },
      {
        question: 'Why is learning about other cultures important for Vietnamese children?',
        options: [
          'To forget our own culture',
          'To broaden horizons and become global citizens while staying proud of Vietnam',
          'To argue with foreigners',
          'To stop speaking Vietnamese',
        ],
        answer: 1,
        explanation: 'Mở rộng tầm nhìn, trở thành công dân toàn cầu mà vẫn tự hào về Việt Nam.',
      },
      {
        question:
          'Fill in the blank: "Let\'s work together to protect our environment and make the Earth a ______ place."',
        options: ['dirtier', 'greener and better', 'noisier', 'darker'],
        answer: 1,
        explanation: 'Xanh hơn và tốt đẹp hơn.',
      },
    ],
  },
];

const SPEECH = {
  english: 'My Dream and Responsibility as a Global Citizen',
  vietnamese: 'Ước mơ và Trách nhiệm của em với tư cách là một Công dân toàn cầu',
  sections: [
    {
      en: 'Introduction',
      vi: 'Mở bài',
      english: [
        'Respected judges and dear friends,',
        'My name is [Tên học sinh], and I am proud to represent the young generation of Vietnam today. Have you ever wondered what children around the world have in common? We all share one home: **Planet Earth**.',
      ],
      vietnamese: [
        'Kính thưa Ban giám khảo cùng các bạn thân mến,',
        'Con tên là [Tên học sinh], và hôm nay con rất tự hào khi được đại diện cho thế hệ trẻ Việt Nam. Các bạn có bao giờ tự hỏi trẻ em trên khắp thế giới có điểm gì chung không? Tất cả chúng ta đều chung sống dưới một mái nhà: **Trái Đất**.',
      ],
    },
    {
      en: 'Body 1: Vietnamese Roots',
      vi: 'Thân bài 1: Cội nguồn Việt Nam',
      english: [
        'Growing up in Vietnam, I have learned valuable lessons from our history and traditions. From the heroic spirit of **Tran Hung Dao** to the gentle beauty of our national flower, **the lotus**. My heritage teaches me to be resilient, kind, and deeply connected to my community.',
      ],
      vietnamese: [
        'Lớn lên ở Việt Nam, con đã học được những bài học quý giá từ lịch sử và truyền thống dân tộc. Từ tinh thần anh dũng của **Trần Hưng Đạo** cho đến vẻ đẹp thanh tao của quốc hoa – **hoa sen**. Di sản quê hương dạy con phải biết kiên cường, nhân hậu và gắn kết sâu sắc với cộng đồng.',
      ],
    },
    {
      en: 'Body 2: Action for the Future',
      vi: 'Thân bài 2: Hành động vì tương lai',
      english: [
        'However, as a global citizen, I know that we are facing big challenges, especially climate change and plastic pollution. That is why my friends and I practice the **"3Rs" rule — Reduce, Reuse, and Recycle** — every single day at school. We plant trees, save electricity, and say no to single-use plastic bags.',
      ],
      vietnamese: [
        'Tuy nhiên, với tư cách là một công dân toàn cầu, con biết rằng chúng ta đang đối mặt với những thách thức lớn, đặc biệt là biến đổi khí hậu và ô nhiễm rác thải nhựa. Đó là lý do tại sao các bạn của con và con thực hành **quy tắc "3R" – Giảm thiểu, Tái sử dụng và Tái chế** – mỗi ngày ở trường học. Chúng con trồng cây, tiết kiệm điện và nói không với túi nhựa dùng một lần.',
      ],
    },
    {
      en: 'Body 3: Bridge to the World',
      vi: 'Thân bài 3: Cầu nối ra thế giới',
      english: [
        "Learning English is my key to unlocking the world. Through English, I can share stories about Vietnam's heritage, food, and friendly people with international friends, while also learning about their wonderful cultures.",
      ],
      vietnamese: [
        'Học tiếng Anh chính là chìa khóa giúp con mở cánh cửa ra thế giới. Thông qua tiếng Anh, con có thể chia sẻ những câu chuyện về di sản, ẩm thực và sự hiếu khách của con người Việt Nam với bạn bè quốc tế, đồng thời học hỏi những nét văn hóa tuyệt vời của họ.',
      ],
    },
    {
      en: 'Conclusion',
      vi: 'Kết bài',
      english: [
        "Let's join hands together. No matter where we come from, we can make a difference. Thank you for listening, and let's **reach out to the world** together!",
      ],
      vietnamese: [
        'Hãy cùng nhau chung tay nhé các bạn. Dù chúng ta đến từ đâu, chúng ta đều có thể tạo ra sự thay đổi. Con xin cảm ơn mọi người đã lắng nghe, và hãy cùng nhau **vươn ra thế giới** nhé!',
      ],
    },
  ],
};

export default { id: 2, name: 'Bộ đề số 2', topics: TOPICS, speech: SPEECH, tips: [] };
