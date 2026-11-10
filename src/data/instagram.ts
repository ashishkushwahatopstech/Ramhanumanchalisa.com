export interface InstagramPost {
  id: string;
  title: string;
  caption: string;
  verseSnippet: string;
  tag: string;
  url: string;
  likesApprox?: string;
  bgGradient: string;
}

export const INSTAGRAM_FEATURED_POSTS: InstagramPost[] = [
  {
    id: "ig-1",
    title: "Daily Morning Chaupai Inspiration",
    caption: "Start your Tuesday morning with the divine blessings of Mahavira Hanuman. Recite Chaupai 25 for physical and mental vital force.",
    verseSnippet: "नासै रोग हरै सब पीरा। जपत निरंतर हनुमत बीरा॥",
    tag: "मंगलवार विशेष",
    url: "https://www.instagram.com/ramhanumanchalisadotcom/",
    likesApprox: "1.2k",
    bgGradient: "from-[#4A1216] via-[#6B1E23] to-[#2B1B12]",
  },
  {
    id: "ig-2",
    title: "The Meaning of Gyan Gun Sagar",
    caption: "Why is Lord Hanuman described as an ocean of wisdom? Dive deep into the Awadhi commentary of Chaupai 1.",
    verseSnippet: "जय हनुमान ज्ञान गुन सागर। जय कपीस तिहुँ लोक उजागर॥",
    tag: "ज्ञान अमृत",
    url: "https://www.instagram.com/ramhanumanchalisadotcom/",
    likesApprox: "980",
    bgGradient: "from-[#C95716] via-[#6B1E23] to-[#34251D]",
  },
  {
    id: "ig-3",
    title: "Brahma Muhurat Recitation Ritual",
    caption: "The spiritual resonance of chanting between 4:00 AM and 5:30 AM before sunrise. Discover how to setup your home altar.",
    verseSnippet: "दुर्गम काज जगत के जेते। सुगम अनुग्रह तुम्हरे तेते॥",
    tag: "पाठ विधि",
    url: "https://www.instagram.com/ramhanumanchalisadotcom/",
    likesApprox: "1.5k",
    bgGradient: "from-[#E87524] via-[#C95716] to-[#4A1216]",
  },
  {
    id: "ig-4",
    title: "Sankat Mochan Ashtak Glory",
    caption: "Eight couplets recounting the heroic feats of Mahavira. Recite on Saturday dusk with a pure ghee diya.",
    verseSnippet: "को नहिं जानत है जग में कपि संकटमोचन नाम तिहारो॥",
    tag: "संकट मोचन",
    url: "https://www.instagram.com/ramhanumanchalisadotcom/",
    likesApprox: "2.1k",
    bgGradient: "from-[#34251D] via-[#4A1216] to-[#6B1E23]",
  },
];
