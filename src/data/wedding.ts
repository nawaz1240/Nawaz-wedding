export interface WeddingEvent {
  id: string;
  name: string;
  subTitle: string;
  date: string;
  dateISO: string;
  islamicDate?: string;
  time: string;
  lunchDetail?: string;
  venue: string;
  address: string;
  city: string;
  state: string;
  country: string;
  mapsSearchUrl: string;
  badge: string;
}

export interface FamilySide {
  side: "bride" | "groom";
  title: string;
  candidateName: string;
  qualifications: string;
  relationshipTitle: string;
  fatherInfo: string;
  additionalInfo: string;
  issuedBy?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  src: string;
  alt: string;
  tag: string;
}

export interface WeddingData {
  bismillahArabic: string;
  bismillahEnglish: string;
  bride: {
    fullName: string;
    qualifications: string;
    shortName: string;
  };
  groom: {
    fullName: string;
    qualifications: string;
    shortName: string;
  };
  monogram: string;
  dateSummary: string;
  islamicDateSummary: string;
  locationSummary: string;
  targetDateTimeISO: string; // Nikah target in IST: 2026-11-25T11:00:00+05:30
  mainInvitationMessage: {
    heading: string;
    invitationBy: string;
    body: string;
    eventInvite: string;
  };
  events: WeddingEvent[];
  families: {
    bride: FamilySide;
    groom: FamilySide;
  };
  closing: {
    title: string;
    duaArabic: string;
    duaTranslation: string;
    message: string;
    compliments: string;
    sbtFamilyCompliments: string;
  };
  shareDetails: {
    title: string;
    messageText: string;
  };
  qrCode: {
    imageSrc: string;
    title: string;
    caption: string;
  };
}

export const weddingData: WeddingData = {
  bismillahArabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  bismillahEnglish: "In the name of Allah, the Most Beneficent, the Most Merciful",
  groom: {
    fullName: "Noushad Mohammed",
    qualifications: "",
    shortName: "Noushad",
  },
    bride: {
    fullName: "Asma Thashreefa",
    qualifications: "",
    shortName: "Asma",
  },
  monogram: "N & A",
  dateSummary: "25 November 2026",
  islamicDateSummary: "",
  locationSummary: "Mangalore, Karnataka",
  targetDateTimeISO: "2026-11-25T11:00:00+05:30",
  mainInvitationMessage: {
    heading: "Wedding Invitation",
    invitationBy: "",
    body: "",
    eventInvite: "With the blessings of Allah and our families, we invite you to join us for the Mehfil-e-Nikah.",
  },
  events: [
    {
      id: "nikah",
      name: "Mehfil-e-Nikah",
      subTitle: "The Sacred Marriage Ceremony",
      date: "Wednesday, 25 November 2026",
      dateISO: "2026-11-25",
      time: "11:00 AM",
      lunchDetail: "Lunch: Thereafter",
      venue: "Unity Hall",
      address: "Kallapu",
      city: "Mangalore",
      state: "Karnataka",
      country: "India",
      mapsSearchUrl:
        "https://www.google.com/maps/search/?api=1&query=Unity+Hall+Kallapu+Mangalore+Karnataka+India",
      badge: "Nikah Ceremony",
    },
  ],
  families: {
    bride: {
      side: "bride",
      title: "Bride's Family",
      candidateName: "Asma Thashreefa",
      qualifications: "",
      relationshipTitle: "",
      fatherInfo: "Daughter of Imtiaz (Lorry Owner, Ballari)",
      additionalInfo: "Grand youngest daughter of the family",
    },
    groom: {
      side: "groom",
      title: "Groom's Family",
      candidateName: "Noushad Mohammed",
      qualifications: "",
      relationshipTitle: "Son of Alhaj Shamsfuddin Ashrafi",
      fatherInfo: "Retired Sorting Postman, Head Post Office, Ballari",
      additionalInfo: "Residing in Ballari, Karnataka",
    },
  },
  closing: {
    title: "With Heartfelt Gratitude & Duas",
    duaArabic: "بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    duaTranslation:
      "“May Allah bless you, shower His blessings upon you, and unite you both in goodness.”",
    message:
      "Thank you for being part of our celebration. Your presence and duas mean so much to our families. May Allah bless this union with love, mercy, peace, and barakah.",
    compliments: "With best compliments from both the family",
    sbtFamilyCompliments: "",
  },
  shareDetails: {
    title: "Wedding Invitation — Noushad Mohammed & Asma Thashreefa",
    messageText:
      "Wedding Invitation — Noushad Mohammed & Asma Thashreefa\n\nMehfil-e-Nikah: Wednesday, 25 November 2026 at 11:00 AM, Unity Hall, Kallapu, Mangalore, Karnataka.\n\nWe warmly invite you to join us and bless the couple.",
  },
  qrCode: {
    imageSrc: "/images/invitation-qr.png",
    title: "Digital Invitation QR Code",
    caption:
      "Supplied wedding invitation QR code. Scan with your camera or QR reader to view.",
  },
};

export const galleryItems: GalleryItem[] = [
  {
    id: "wedding-artwork",
    title: "Wedding Floral Artwork",
    caption:
      "Commemorative illustrated wedding artwork of Ameenuddin & Madeeha with pink floral wreath and royal crest.",
    src: "/images/wedding-artwork.png",
    alt: "Ameenuddin weds Madeeha illustrated wedding artwork",
    tag: "Artwork",
  },
  {
    id: "printed-invitation",
    title: "Official Printed Invitation",
    caption:
      "The physical wedding invitation card featuring laser-cut SBT Family filigree cover and royal ivory insert.",
    src: "/images/printed-invitation.jpg",
    alt: "Photograph of physical printed wedding invitation card",
    tag: "Physical Card",
  },
];
