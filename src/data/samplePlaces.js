// Haritada gösterilecek örnek yerler.

const samplePlaces = [

  {
    id: 1,
    city: "Büyük Set Resifi",
    country: "Avustralya",
    lat: -18.2871,
    lng: 147.6992,
    status: "wish",
    comments: [
      { id: 1, text: "🐠 Dünyanın en büyük canlı yapısı — 2.300 km uzunluğunda! Dalış yaparken mercan bahçelerinin arasında süzülmek hayalim.", date: "10.01.2024" },
      { id: 2, text: "⚠️ İklim değişikliği nedeniyle resifler hızla bozuluyor. Görmeden çok geç olmadan gitmem lazım!", date: "15.02.2024" },
    ],
  },

  {
    id: 2,
    city: "Aurora Borealis",
    country: "Norveç",
    lat: 69.6492,
    lng: 18.9553,
    status: "wish",
    comments: [
      { id: 1, text: "🌌 Kuzey ışıklarını gökyüzünde dans ederken görmek... Bu dünyadaki en büyük hayallerimden biri.", date: "05.12.2023" },
      { id: 2, text: "❄️ Tromsø'da kar üzerinde yatarak aurora izlemek istiyorum. Aralık-Mart arası en iyi dönem.", date: "20.01.2024" },
    ],
  },

  {
    id: 3,
    city: "Victoria Şelaleleri",
    country: "Zimbabve",
    lat: -17.9243,
    lng: 25.8572,
    status: "wish",
    comments: [
      { id: 1, text: "💦 Dünyanın en büyük şelalesi — yerel dilde 'Mosi-oa-Tunya' yani 'gümbürdeyenDuman'. Kilometrelerce uzaktan görünebiliyor!", date: "08.03.2024" },
    ],
  },

  {
    id: 4,
    city: "Grand Canyon",
    country: "ABD",
    lat: 36.1069,
    lng: -112.1129,
    status: "visited",
    comments: [
      { id: 1, text: "🏜️ Gittim ve kelimeler gerçekten yetmiyor. 446 km uzunluk, 1.6 km derinlik — insan kendini çok küçük hissediyor.", date: "14.07.2022" },
      { id: 2, text: "🌅 Günbatımını South Rim'den izledim, gökyüzü turuncu-kırmızıya döndü. O anı hiç unutamayacağım.", date: "14.07.2022" },
      { id: 3, text: "🚁 Bir sonraki seferde helikopter turu yapmak istiyorum — tepeden görünüş çok daha etkileyici olmalı!", date: "20.08.2023" },
    ],
  },

  {
    id: 5,
    city: "Angel Şelaleleri",
    country: "Venezuela",
    lat: 5.9698,
    lng: -62.5358,
    status: "wish",
    comments: [
      { id: 1, text: "🌊 979 metre yükseklikten düşen dünyanın en yüksek şelalesi! Ormanın içinden tekneyle yaklaşmak çok romantik olmalı.", date: "12.02.2024" },
    ],
  },

  {
    id: 6,
    city: "Machu Picchu",
    country: "Peru",
    lat: -13.1631,
    lng: -72.5450,
    status: "visited",
    comments: [
      { id: 1, text: "🏔️ Bulutların üzerinde bir İnka şehri. Sabah 5'te girişte bekliyordum, sis dağılırken ortaya çıkan manzara nefes kesti.", date: "03.09.2021" },
      { id: 2, text: "🦙 Tapınak avlusunda rahatça gezen lamaları görünce çok şaşırdım 😄 Beklediğimden çok daha büyük ve etkileyiciydi.", date: "03.09.2021" },
    ],
  },

  {
    id: 7,
    city: "Petra",
    country: "Ürdün",
    lat: 30.3285,
    lng: 35.4444,
    status: "wish",
    comments: [
      { id: 1, text: "🏛️ Kayalara oyulmuş bu antik Nabati şehrini görmek için can atıyorum. 'El Hazne' hazinesinin önünde durmayı hayal ediyorum.", date: "25.11.2023" },
      { id: 2, text: "🕯️ Gece mum ışığında Petra turu varmış — bu deneyimi muhakkak yaşamak istiyorum!", date: "10.01.2024" },
    ],
  },

  {
    id: 8,
    city: "Efes Antik Kenti",
    country: "Türkiye",
    lat: 37.9395,
    lng: 27.3417,
    status: "visited",
    comments: [
      { id: 1, text: "🏺 İzmir'e yakın olduğu için birkaç kez gittim ama her seferinde farklı bir şey keşfediyorum. Celsus Kütüphanesi karşısında hep bir an duruyorum.", date: "22.06.2023" },
      { id: 2, text: "☀️ Yazın çok sıcak oluyor, sabah erken saatte gitmeyi kesinlikle tavsiye ederim!", date: "22.06.2023" },
    ],
  },

  {
    id: 9,
    city: "Angkor Wat",
    country: "Kamboçya",
    lat: 13.4125,
    lng: 103.8670,
    status: "wish",
    comments: [
      { id: 1, text: "⛩️ Dünyanın en büyük dini anıtı — 400 km² alan kaplıyor! Gün doğumunda tapınağın yansımasını havuzda görmek istiyorum.", date: "30.01.2024" },
    ],
  },

  {
    id: 10,
    city: "Roma",
    country: "İtalya",
    lat: 41.8902,
    lng: 12.4922,
    status: "visited",
    comments: [
      { id: 1, text: "🏛️ Kolezyum'un içinde yürürken gladyatörlerin seslerini duyar gibi oldum. Tarihin bu kadar somut hissettirdiği başka bir şehir bilmiyorum.", date: "18.04.2023" },
      { id: 2, text: "🍝 Trastevere semtinde küçük bir restoranda yediğim cacio e pepe, hayatımın en güzel makarnasıydı! 🍷", date: "19.04.2023" },
      { id: 3, text: "⛲ Trevi Çeşmesi'ne bozuk para attım — geri dönmek zorundayım! 😄", date: "20.04.2023" },
    ],
  },

  {
    id: 11,
    city: "Paris",
    country: "Fransa",
    lat: 48.8566,
    lng: 2.3522,
    status: "visited",
    comments: [
      { id: 1, text: "🗼 Eyfel Kulesi gece ışıklandığında gerçekten büyülüyor. Saat başı yanıp sönen ışıkları izlemek için saatlerce oturdum.", date: "12.10.2022" },
      { id: 2, text: "🥐 Sabah kahvaltısında taze kruvasan ve cafe au lait — Parislilerin bu ritüelini çok kıskandım!", date: "13.10.2022" },
    ],
  },

  {
    id: 12,
    city: "Santorini",
    country: "Yunanistan",
    lat: 36.3932,
    lng: 25.4615,
    status: "wish",
    comments: [
      { id: 1, text: "🌅 Oia'dan izlenen günbatımı dünyanın en güzel manzaralarından biri olarak gösteriliyor. O beyaz evler, mavi kubbeler ve turuncu gökyüzü kombinasyonu...", date: "20.01.2024" },
      { id: 2, text: "🍷 Yerel şarap ve taze deniz ürünleriyle romantik bir akşam yemeği hayal ediyorum. Bu ada bir gün mutlaka!", date: "05.03.2024" },
    ],
  },

  {
    id: 13,
    city: "Bali",
    country: "Endonezya",
    lat: -8.3405,
    lng: 115.0920,
    status: "visited",
    comments: [
      { id: 1, text: "🌺 Ubud'daki pirinç tarlaları arasında sabah yürüyüşü yaptım — dünyanın en huzurlu anıydı.", date: "22.06.2023" },
      { id: 2, text: "🕌 Tanah Lot Tapınağı'nı gün batımında gördüm, okyanus dalgalarının arasında yükselen bu tapınak inanılmaz bir görüntü.", date: "23.06.2023" },
      { id: 3, text: "🏄 Kuta'da sörf dersi aldım, ilk kez ayağa kalktığımda sahildekiler alkışladı 😄 Tekrar gelmek istiyorum kesinlikle!", date: "25.06.2023" },
    ],
  },

  {
    id: 14,
    city: "İstanbul",
    country: "Türkiye",
    lat: 41.0082,
    lng: 28.9784,
    status: "visited",
    comments: [
      { id: 1, text: "🕌 İki kıtayı birleştiren tek şehir! Ayasofya'nın içinde durup kubbeye bakarken tarih üstüme yığıldı gibi hissettim.", date: "10.08.2023" },
      { id: 2, text: "🚢 Boğaz turu sırasında Avrupa'dan Asya'ya geçmek — bu geçişi fark etmek çok özel bir his.", date: "11.08.2023" },
      { id: 3, text: "🐱 Kadıköy sokaklarında her köşede bir kedi var! İstanbul kedileri bu şehrin en sevimli sakinleri 🐾", date: "12.08.2023" },
    ],
  },

];

export default samplePlaces;