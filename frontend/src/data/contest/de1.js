// Nội dung từ docs/Bo De Thi Thiêu Nhi Viet Nam Vuon Ra The Gioi.markdown — định dạng xem contest/index.js

const TOPICS = [
  {
    id: 'culture',
    english: 'Vietnamese Culture, History & Geography',
    vietnamese: 'Văn hóa, Lịch sử & Địa lý Việt Nam',
    questions: [
      {
        question: 'What is the traditional clothing of Vietnamese people often worn on special occasions like Tet?',
        options: ['Kimono', 'Ao Dai', 'Hanbok', 'Cheongsam'],
        answer: 1,
        explanation: 'Áo dài là trang phục truyền thống của Việt Nam.',
      },
      {
        question: 'Ha Long Bay, a famous UNESCO World Heritage Site in Vietnam, is located in which province?',
        options: ['Quang Ninh', 'Da Nang', 'Ninh Binh', 'Lao Cai'],
        answer: 0,
        explanation: 'Vịnh Hạ Long thuộc tỉnh Quảng Ninh.',
      },
      {
        question: 'What is the capital city of Vietnam?',
        options: ['Ho Chi Minh City', 'Da Nang', 'Hanoi', 'Hue'],
        answer: 2,
        explanation: 'Hà Nội là thủ đô của Việt Nam.',
      },
      {
        question: 'Which traditional Vietnamese food is a noodle soup served with beef or chicken?',
        options: ['Banh Mi', 'Pho', 'Banh Chung', 'Spring rolls'],
        answer: 1,
        explanation: 'Phở là món ăn truyền thống nổi tiếng.',
      },
      {
        question: 'Hung Kings Commemoration Day is celebrated on which day of the 3rd lunar month?',
        options: ['1st', '5th', '10th', '15th'],
        answer: 2,
        explanation: 'Ngày Giỗ Tổ Hùng Vương diễn ra vào ngày 10 tháng 3 Âm lịch.',
      },
      {
        question: 'What is the main color of the national flag of Vietnam?',
        options: ['Yellow with a red star', 'Red with a yellow star', 'Blue with a white star', 'Green with a yellow star'],
        answer: 1,
        explanation: 'Lá cờ Tổ quốc có nền đỏ sao vàng.',
      },
      {
        question: 'Which cake is traditional and indispensable during the Lunar New Year (Tet) in Vietnam?',
        options: ['Mooncake', 'Banh Chung (Square sticky rice cake)', 'Pancake', 'Cupcake'],
        answer: 1,
        explanation: 'Bánh chưng là món bánh truyền thống không thể thiếu ngày Tết.',
      },
      {
        question: 'Son Doong Cave, one of the largest natural caves in the world, is located in which national park?',
        options: ['Cuc Phuong', 'Phong Nha - Ke Bang', 'Cat Tien', 'Ba Vi'],
        answer: 1,
        explanation: 'Hang Sơn Đoòng thuộc Vườn quốc gia Phong Nha - Kẻ Bàng.',
      },
      {
        question: 'What form of folk art is performed on water and originated in the Red River Delta?',
        options: ['Ca Tru', 'Water Puppetry (Múa rối nước)', 'Quan Ho', 'Cheo'],
        answer: 1,
        explanation: 'Múa rối nước là nghệ thuật dân gian độc đáo của vùng đồng bằng sông Hồng.',
      },
      {
        question: 'Which famous bridge in Da Nang can breathe fire and water on weekend evenings?',
        options: ['Japan Covered Bridge', 'Dragon Bridge', 'Trang Tien Bridge', 'Long Bien Bridge'],
        answer: 1,
        explanation: 'Cầu Rồng ở Đà Nẵng.',
      },
    ],
  },
  {
    id: 'environment',
    english: 'Environment & Green Living',
    vietnamese: 'Môi trường & Lối sống xanh',
    questions: [
      {
        question: 'What does "3R" stand for in environmental protection?',
        options: ['Read, Write, Remember', 'Reduce, Reuse, Recycle', 'Run, Rain, River', 'Rest, Reset, Repeat'],
        answer: 1,
        explanation: 'Giảm thiểu, Tái sử dụng, Tái chế.',
      },
      {
        question: 'Which material takes hundreds of years to decompose and causes land and ocean pollution?',
        options: ['Paper', 'Plastic', 'Wood', 'Leaves'],
        answer: 1,
        explanation: 'Nhựa mất hàng trăm năm để phân hủy.',
      },
      {
        question: 'What should students do to save electricity at school?',
        options: [
          'Leave the lights on all day',
          'Turn off fans and lights when leaving the room',
          'Keep the air conditioner at 16 degrees',
          'Plug in devices without using them',
        ],
        answer: 1,
        explanation: 'Tắt quạt và đèn khi ra khỏi phòng.',
      },
      {
        question: 'Which action helps to make our environment greener and cleaner?',
        options: [
          'Littering in public places',
          'Planting more trees and flowers',
          'Using single-use plastic bags',
          'Burning trash near houses',
        ],
        answer: 1,
        explanation: 'Trồng thêm nhiều cây xanh và hoa.',
      },
      {
        question: 'What is an eco-friendly replacement for single-use plastic straws?',
        options: ['Plastic straws', 'Bamboo or paper straws', 'Nylon bags', 'Styrofoam cups'],
        answer: 1,
        explanation: 'Ống hút tre hoặc giấy.',
      },
      {
        question: 'Why is Earth Day celebrated globally?',
        options: [
          'To encourage shopping',
          'To raise awareness about environmental protection',
          'To celebrate summer holidays',
          'To play video games',
        ],
        answer: 1,
        explanation: 'Nâng cao nhận thức về bảo vệ môi trường.',
      },
      {
        question: 'Which type of energy is clean and renewable?',
        options: ['Coal', 'Oil', 'Solar energy (Năng lượng mặt trời)', 'Gasoline'],
        answer: 2,
        explanation: 'Năng lượng mặt trời là năng lượng sạch và tái tạo được.',
      },
      {
        question: 'How can we protect water sources from pollution?',
        options: [
          'Throwing trash into rivers',
          'Pouring chemicals into lakes',
          'Not throwing waste into rivers, lakes, and oceans',
          'Wasting water every day',
        ],
        answer: 2,
        explanation: 'Không vứt rác xuống sông, hồ, biển.',
      },
    ],
  },
  {
    id: 'english',
    english: 'English Usage, Communication & Life Skills',
    vietnamese: 'Tiếng Anh & Kỹ năng',
    questions: [
      {
        question: 'Vietnamese children are known for being very friendly and ______.',
        options: ['rude', 'hospitable', 'lazy', 'shy'],
        answer: 1,
        explanation: 'Trẻ em Việt Nam nổi tiếng thân thiện và hiếu khách.',
      },
      {
        question: 'If an international friend asks you for directions to the nearest post office, what should you do?',
        options: [
          'Run away',
          'Politely guide them or show them on a map',
          'Ignore them',
          "Speak in a language they don't understand",
        ],
        answer: 1,
        explanation: 'Lịch sự chỉ đường hoặc chỉ trên bản đồ.',
      },
      {
        question: 'What is the best way to improve your English speaking skills?',
        options: [
          'Only writing grammar exercises',
          'Practicing speaking with friends and listening to English daily',
          'Staying silent',
          'Memorizing words without speaking',
        ],
        answer: 1,
        explanation: 'Luyện nói và nghe mỗi ngày.',
      },
      {
        question: '"Youth Union" in Vietnam is translated into English as ______.',
        options: [
          'Ho Chi Minh Young Pioneer Organization',
          'Ho Chi Minh Communist Youth Union',
          "Children's Fund",
          'Student Club',
        ],
        answer: 1,
        explanation: 'Đoàn TNCS Hồ Chí Minh.',
      },
      {
        question: 'Complete the sentence: "We are proud ______ our country\'s rich history and culture."',
        options: ['of', 'in', 'at', 'on'],
        answer: 0,
        explanation: 'Cụm từ: proud of – tự hào về.',
      },
      {
        question: 'Which skill is most important when presenting in front of an audience?',
        options: [
          'Looking at the floor',
          'Speaking clearly with confidence and body language',
          'Speaking as fast as possible',
          'Reading directly from a paper',
        ],
        answer: 1,
        explanation: 'Nói rõ ràng, tự tin, kết hợp ngôn ngữ cơ thể.',
      },
      {
        question: '"Ho Chi Minh Young Pioneer Organization" refers to ______.',
        options: [
          'Hội Sinh viên Việt Nam',
          'Đội Thiếu niên Tiền phong Hồ Chí Minh',
          'Hội Liên hiệp Thanh niên',
          'Câu lạc bộ Tiếng Anh',
        ],
        answer: 1,
        explanation: 'Đội Thiếu niên Tiền phong Hồ Chí Minh.',
      },
      {
        question: 'Choose the correct response: "Thank you for showing me around your hometown!" – "______"',
        options: ["No problem! You're welcome!", 'Yes, I am.', 'Goodbye!', "I don't know."],
        answer: 0,
        explanation: 'Không có gì! Rất hân hạnh!',
      },
      {
        question: 'What should you bring when introducing Vietnamese culture to international friends?',
        options: [
          'A traditional souvenir (like a conical hat or souvenir postcard)',
          'Video games',
          'Homework',
          'Plastic bags',
        ],
        answer: 0,
        explanation: 'Vật phẩm lưu niệm truyền thống như nón lá, bưu thiếp.',
      },
      {
        question: 'Which adjective best describes a global child (công dân toàn cầu)?',
        options: ['Narrow-minded', 'Confident, creative, and open-minded', 'Selfish', 'Passive'],
        answer: 1,
        explanation: 'Tự tin, sáng tạo và cởi mở.',
      },
      {
        question: 'Complete the slogan: "Vietnamese Children – ______ to the World!"',
        options: ['Going', 'Reaching out', 'Running', 'Flying'],
        answer: 1,
        explanation: 'Thiếu nhi Việt Nam – Vươn ra thế giới.',
      },
      {
        question: 'Learning English helps children to ______ with global friends and share Vietnamese culture.',
        options: ['disconnect', 'connect', 'hide', 'forget'],
        answer: 1,
        explanation: 'Kết nối với bạn bè quốc tế.',
      },
    ],
  },
];

const SPEECH = {
  english: 'Introducing Vietnamese Culture and Hospitality to International Friends',
  vietnamese: 'Giới thiệu Văn hóa và Sự hiếu khách của Việt Nam đến Bạn bè Quốc tế',
  sections: [
    {
      en: 'Introduction',
      vi: 'Mở bài',
      english: [
        'Hello, distinguished judges, teachers, and dear friends!',
        'My name is [Tên học sinh], and I am [Tuổi] years old. I am a student in Class [Lớp] at [Tên trường] Primary School, located in the beautiful city of [Tên tỉnh/thành phố].',
        'Today, I am super excited and proud to stand here to share with you about my beloved country – Vietnam!',
      ],
      vietnamese: [
        'Xin chào Ban giám khảo quý mến, các thầy cô giáo cùng toàn thể các bạn!',
        'Con tên là [Tên học sinh], năm nay con [Tuổi] tuổi. Con là học sinh lớp [Lớp], Trường Tiểu học [Tên trường], thuộc thành phố [Tên tỉnh/thành phố] xinh đẹp.',
        'Hôm nay, con vô cùng hào hứng và tự hào khi được đứng đây để chia sẻ với mọi người về đất nước Việt Nam thân yêu của con!',
      ],
    },
    {
      en: 'Body 1: Culture & Cuisine',
      vi: 'Thân bài 1: Văn hóa & Ẩm thực',
      english: [
        'Vietnam is a small S-shaped country in Southeast Asia, but it has a rich history of over 4,000 years and 54 diverse ethnic groups. When people think of Vietnam, they often think of our elegant **Ao Dai** and delicious traditional food. Have you ever tried **Pho** or **Banh Mi**? They are famous all around the world! Also, during the Lunar New Year, known as Tet, families gather to make **Banh Chung**, a green square cake made of sticky rice, pork, and green beans.',
      ],
      vietnamese: [
        'Việt Nam là một đất nước hình chữ S nhỏ nhắn tại Đông Nam Á, nhưng lại sở hữu lịch sử lâu đời hơn 4.000 năm cùng 54 dân tộc anh em vô cùng phong phú. Khi nhắc đến Việt Nam, mọi người thường nhớ ngay đến chiếc **áo dài** duyên dáng và những món ăn truyền thống thơm ngon. Các bạn đã bao giờ thử món **Phở** hay **Bánh mì** chưa? Đó là những món ăn đã nổi tiếng khắp thế giới! Ngoài ra, vào dịp Tết Nguyên Đán, các gia đình Việt Nam cùng quây quần gói **Bánh chưng** – món bánh vuông màu xanh làm từ gạo nếp, thịt lợn và đỗ xanh.',
      ],
    },
    {
      en: 'Body 2: Nature & People',
      vi: 'Thân bài 2: Thiên nhiên & Con người',
      english: [
        'Not only does Vietnam have delicious food, but it also boasts stunning natural landscapes. From the magnificent limestone islands of **Ha Long Bay** to the breathtaking mountain terraces in **Sa Pa**, and the largest natural cave in the world, **Son Doong**, in Phong Nha - Ke Bang. But above all, the most beautiful thing about Vietnam is its **people**. Vietnamese people are warm, hardworking, and always welcome international friends with big smiles and open hearts.',
      ],
      vietnamese: [
        'Không chỉ có ẩm thực độc đáo, Việt Nam còn sở hữu nhiều danh lam thắng cảnh thiên nhiên tuyệt đẹp. Từ những đảo đá vôi hùng vĩ ở **Vịnh Hạ Long**, những thửa ruộng bậc thang kỳ vĩ ở **Sa Pa**, cho đến hang động tự nhiên lớn nhất thế giới **Sơn Đoòng** tại Phong Nha - Kẻ Bàng. Nhưng trên tất cả, điều tuyệt vời nhất ở Việt Nam chính là **con người**. Người dân Việt Nam luôn ấm áp, cần cù và sẵn sàng chào đón bạn bè quốc tế bằng nụ cười rạng rỡ và trái tim rộng mở.',
      ],
    },
    {
      en: 'Body 3: Call to Action & Message',
      vi: 'Thân bài 3: Thông điệp & Hành động',
      english: [
        'As a young pioneer of Vietnam, I am working hard to learn English every day. I want to build a bridge between Vietnam and the world, sharing our traditions while learning about different global cultures.',
      ],
      vietnamese: [
        'Là một đội viên Thiếu niên Tiền phong Hồ Chí Minh, con đang nỗ lực học tiếng Anh mỗi ngày. Con mong muốn trở thành một cầu nối nhỏ giữa Việt Nam và thế giới, vừa lan tỏa truyền thống dân tộc, vừa học hỏi thêm những nền văn hóa độc đáo từ bạn bè quốc tế.',
      ],
    },
    {
      en: 'Conclusion',
      vi: 'Kết bài',
      english: [
        "If you haven't visited Vietnam yet, pack your bags and come! Vietnam is always ready to welcome you with warmth and love.",
        'Thank you so much for listening! Wish the competition a great success!',
      ],
      vietnamese: [
        'Nếu các bạn chưa từng ghé thăm Việt Nam, hãy xách ba lô lên và đến đây ngay nhé! Việt Nam luôn sẵn sàng chào đón bạn với sự ấm áp và yêu thương.',
        'Con xin chân thành cảm ơn mọi người đã chú ý lắng nghe! Chúc cuộc thi thành công rực rỡ!',
      ],
    },
  ],
};

const TIPS = [
  {
    icon: '👘',
    title: 'Trang phục',
    text: 'Mặc áo dài truyền thống, đồng phục học sinh có khăn quàng đỏ hoặc trang phục dân tộc.',
  },
  {
    icon: '🎨',
    title: 'Đạo cụ',
    text: 'Cầm theo bức tranh tự vẽ, nón lá, hoặc mô hình món ăn / danh thắng để minh họa khi nói đến đoạn đó.',
  },
  {
    icon: '🗣️',
    title: 'Phát âm & Cảm xúc',
    text: 'Phát âm rõ ràng các từ khóa quan trọng (**Ao Dai, Pho, Ha Long Bay, hospitable…**), luôn giữ nụ cười và giao tiếp bằng ánh mắt với ống kính.',
  },
];

export default { id: 1, name: 'Bộ đề số 1', topics: TOPICS, speech: SPEECH, tips: TIPS };
