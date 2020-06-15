import imgs from "../../projects/**/*.jpg";

const projects = [
  {
    images: {
      desktop: {
        start: 1,
        end: 4,
      },
      mobile: {
        start: 1,
        end: 10,
      },
    },
    alt: {
      ru: "Апартаменты в Москве \nпубликация AD\u00A02019",
      en: "Apartments in Moscow \npublication AD\u00A02019",
    },
  },
  {
    images: {
      desktop: {
        start: 5,
        end: 7,
      },
      mobile: {
        start: 11,
        end: 19,
      },
    },
    alt: {
      ru:
        "ЖК 'Усадьба Трубецких' в Москве \nпубликация ELLE Decoration Russia\u00A02019",
      en:
        'RC "Usad\'ba Trubeckih" in Moscow \npublication ELLE Decoration Russia\u00A02019',
    },
  },
  {
    images: {
      desktop: {
        start: 8,
        end: 13,
      },
      mobile: {
        start: 20,
        end: 33,
      },
    },
    alt: {
      ru: "Дом в Москве \nпубликация AD&nbsp;2018",
      en: "House in Moscow \npublication AD&nbsp;2018",
    },
  },
  {
    images: {
      desktop: {
        start: 14,
        end: 22,
      },
      mobile: {
        start: 34,
        end: 55,
      },
    },
    alt: {
      ru:
        "Дом в пригороде Москвы \nпубликация ELLE Decoration Russia\u00A02018",
      en:
        "House in the suburbs of Moscow \npublication ELLE Decoration Russia\u00A02018",
    },
  },
  {
    images: {
      desktop: {
        start: 23,
        end: 25,
      },
      mobile: {
        start: 56,
        end: 64,
      },
    },
    alt: {
      ru: "Квартира в Москве \nпубликация Интерьер+Дизайн\u00A02018",
      en: "Apartment in Moscow \npublication INTERIOR + DESIGN\u00A02018",
    },
  },
  {
    images: {
      desktop: {
        start: 26,
        end: 31,
      },
      mobile: {
        start: 65,
        end: 82,
      },
    },
    alt: {
      ru: "ЖК 'Садовые кварталы' \nпубликация ELLE Decoration Russia\u00A02017",
      en:
        'RC "Sadovye kvartaly" \npublication ELLE Decoration Russia\u00A02017',
    },
  },
  {
    images: {
      desktop: {
        start: 32,
        end: 34,
      },
      mobile: {
        start: 83,
        end: 87,
      },
    },
    alt: {
      ru: "Квартира в Москве \nпубликация AD\u00A02016",
      en: "Apartment in Moscow \npublication AD\u00A02016",
    },
  },
  {
    images: {
      desktop: {
        start: 32,
        end: 34,
      },
      mobile: {
        start: 88,
        end: 93,
      },
    },
    alt: {
      ru:
        "Дом в пригороде Москвы \nпубликация ELLE Decoration Russia\u00A02016",
      en:
        "House in the suburbs of Moscow \npublication ELLE Decoration Russia\u00A02016",
    },
  },
];

const projectImages = projects.map((item) => {
  const desktopLength = item.images.desktop.end - item.images.desktop.start + 1;
  const mobileLength = item.images.mobile.end - item.images.mobile.start + 1;

  const downloadImages = (length, folder, fileName) =>
    new Array(length).fill("0").map((image, index) => {
      const str = `../../projects/${folder}/${fileName}${
        item.images.desktop.start + index
      }.jpg`;
      return {
        full: imgs[folder][`${fileName}${item.images.desktop.start + index}`],
        half:
          imgs[folder].half[
            `${fileName}${item.images.desktop.start + index}-half`
          ],
        low:
          imgs[folder].low[
            `${fileName}${item.images.desktop.start + index}-half-low`
          ],
      };
    });

  const desktopImages = downloadImages(desktopLength, "desktop", "project");
  const mobileImages = downloadImages(mobileLength, "mobile", "project-mob");

  return {
    ...item,
    desktopImages,
    mobileImages,
  };
});

export default projectImages;
