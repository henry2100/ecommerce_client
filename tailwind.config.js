/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    screens: {
      //Custom Queries//
      'mobile': { 'min': '200px', 'max': '600px' },

      'tablet': { 'mim': '601px', 'max': '1199px' },

      'desktop': { 'min': '1200px' }
    },
    extend: {
      boxShadow: {
        'custom_border': '3px 0px 20px 0px #0000000A',
      },
      transitionDuration: {
        '250': '250ms',
        '500': '500ms',
        '750': '750ms',
        '1000': '1000ms',
      },
      colors: {
        PrimaryDisabled: '#e2e8f0', // slate-100
        Primary_200: '#e2e8f0',
        Primary_300: '#cbd5e1',
        Primary: '#94a3b8', // slate-400
        PrimaryActive: '#64748b', // slate-500
        Primary_600: '#475569',
        Primary_700: '#334155',
        Primary_800: '#1e293b',
        Primary_900: '#0f172a',

        Success: "#04A778",
        Success2: "#027A48",

        Green_Accent: "#ACFDE6",
        Green_Accent2: "#02543C",
        Green_Accent3: "#D6FEF2",
        Green_Accent4: "#F5FFFC",
        Green_Accent5: "#037D5A",
        Green_Accent6: "#04A77829",
        Green_Accent7: "#039855",
        Green_Accent8: "#ECFDF3",

        Danger: "#FF3C38",
        Danger2: "#C20400",
        Danger3: "#E61B17",
        Danger4: "#B42318",

        DangerAccent: "#FFF3F5",
        DangerAccent2: "#7C0012",
        DangerAccent3: "#FFE7E6",
        DangerAccent4: "#FFF1F3",
        DangerAccent5: "#FEF3F2",

        Warning: "#DC6803",
        WarningAccent: "#DC68031A",

        Yellow: "#FFBF00",
        Yellow_Accent: "#FFF7DF",
        Yellow_Accent2: "#E5AC01",

        SecondaryAccent: '#747C91',
        SecondaryAccent2: '#DADCE8',
        SecondaryAccent3: '#F3F5FC',
        SecondaryAccent4: '#FDFDFD',
        SecondaryAccent5: '#E7E9F1',
        SecondaryAccent6: '#626F86',
        SecondaryAccent7: '#E5F0FF',
        SecondaryAccent8: '#F7F8F9',
        SecondaryAccent9: '#F0F1F3',
        SecondaryAccent10: '#4C5467',
        SecondaryAccent11: '#F8F9FC',

        Accent_blue: '#3186FD',
        Accent_blue2: '#98C3FE',
        Accent_blue3: '#025FE0',
        Accent_blue4: '#012F70',
        Accent_blue5: '#E2EEFF',
        Accent_blue6: '#363F72',

        Background: '#F8F9FA',
        Background1: '#FAFAFA',
        Background2: '#F8F8FC',
        Background3: '#F2F4F7',
        Background4: '#F9F9FB',
        Background5: '#F9FAFB',
        Background6: '#F4F5F9',

        transparent: '#e6e6e6',

        GrayCustom: '#898989',
        GrayCustom1: '#cacaca',
        GrayCustom2: '#959595',
        GrayCustom3: '#D9DBE85E',
        GrayCustom4: '#2C2C2E',
        GrayCustom5: '#DADCE833',
        GrayCustom6: '#F7F8FA',
        GrayCustom7: '#7B7B7B',
        GrayCustom8: '#E7E9F1',
        GrayCustom9: '#656c75',
        GrayCustom10: '#52525B',
        GrayCustom11: '#DFE1E7',
        GrayCustom12: '#0000001a',
        GrayCustom13: '#D0D5DD',

        Black2: '#656C75',
        Black3: '#667085',
        Black4: '#17191D',
        Black5: '#959595',
        Black6: '#2E2F33',

        DarkBg: '#121212',
        DarkBg2: '#1C1C1C',
        DarkBg3: '#020607',
        DarkBg4: '#00000033',
        DarkBg5: '#00000080',
        DarkBg6: '#344054',
        DarkBg7: '#101828',
        DarkBg8: '#424242',
        DarkBg9: '#0000000d',

        Primary_Accents_xs: "#94a3b81a",
        Primary_Accents_sm: "#94a3b833",
        Primary_Accents_md: "#94a3b84d",
        Primary_Accents_lg: "#94a3b866",
        Primary_Accents_xl: "#94a3b880",
        Primary_Accents_2xl: "#94a3b899",
        Primary_Accents_3xl: "#94a3b8b3",
        Primary_Accents_4xl: "#94a3b8cc",
        Primary_Accents_5xl: "#94a3b8e6",

        BackDrop_l_xs: "#ffffff1a",
        BackDrop_l_sm: "#ffffff33",
        BackDrop_l_md: "#ffffff4d",
        BackDrop_l_lg: "#ffffff66",
        BackDrop_l_xl: "#ffffff80",
        BackDrop_l_2xl: "#ffffff99",
        BackDrop_l_3xl: "#ffffffb3",
        BackDrop_l_4xl: "#ffffffcc",
        BackDrop_l_5xl: "#ffffffe6",

        BackDrop_d_xs: "#0000001a",
        BackDrop_d_sm: "#00000033",
        BackDrop_d_md: "#0000004d",
        BackDrop_d_lg: "#00000066",
        BackDrop_d_xl: "#00000080",
        BackDrop_d_2xl: "#00000099",
        BackDrop_d_3xl: "#000000b3",
        BackDrop_d_4xl: "#000000cc",
        BackDrop_d_5xl: "#000000e6",

        NoColor: '#00000000',

        gradientNav: 'linear-gradient(186deg, #4B4D52 -14.8%, rgba(75, 77, 82, 0.00) 132.74%)',
      },
      keyframes: {
        slideUp: {
          from: {
            opacity: 0.75,
            transform: 'translateY(5rem)'
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)'
          }
        },
        slideDown: {
          from: {
            opacity: 0.75,
            transform: 'translateY(-5rem)'
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)'
          }
        },
        slideDown2: {
          from: {
            transform: 'translateY(-40px)'
          },
          to: {
            transform: 'translateY(0)'
          }
        },
        slideRight: {
          from: {
            opacity: 0.5,
            transform: 'translateX(-50%)'
          },
          to: {
            opacity: 1,
            transform: 'translateX(0)'
          }
        },
        slideRight2: {
          from: {
            transform: 'translateX(-80%)'
          },
          to: {
            transform: 'translateX(0)'
          }
        },
        slideLeft: {
          from: {
            opacity: 0.5,
            transform: 'translateX(50%)'
          },
          to: {
            opacity: 1,
            transform: 'translateX(0)'
          }
        },
        fullRoll: {
          from: {
            transform: 'rotate(0deg)'
          },
          to: {
            transform: 'rotate(-360deg)'
          }
        },
        fadeIn: {
          from: {
            opacity: 0
          },
          to: {
            opacity: 1
          }
        },
        leftSlider: {
          from: {
            opacity: 1,
            transform: 'translateX(100%)'
          },
          to: {
            opacity: 0,
            transform: 'translateX(0)'
          }
        },
        rightSlider: {
          from: {
            opacity: 1,
            transform: 'translateX(-100%)'
          },
          to: {
            opacity: 0,
            transform: 'translateX(0)'
          }
        },
      },
      animation: {
        'slide_up': 'slideUp .25s linear',
        'slide_down': 'slideDown .25s linear',
        'slide_down2': 'slideDown2 .25s linear',
        'slide_right': 'slideRight .25s linear',
        'slide_right2': 'slideRight2 .25s linear',
        'slide_left': 'slideLeft .25s linear',
        'fullRoll': 'fullRoll .8s linear infinite',
        'fade_in': 'fadeIn .25s linear',
        'carousel_slide_left': 'leftSlider 1.5s linear',
        'carousel_slide_right': 'rightSlider 1.5s linear'
      },
    },
  },
  plugins: [],
}

