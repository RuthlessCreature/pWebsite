import type { Locale, RouteKey } from "@/lib/i18n/config";
import type { SiteDictionary } from "@/lib/i18n/types";
import en from "@/lib/i18n/locales/en.json";
import es from "@/lib/i18n/locales/es.json";
import ja from "@/lib/i18n/locales/ja.json";
import pt from "@/lib/i18n/locales/pt.json";
import ru from "@/lib/i18n/locales/ru.json";
import zhCn from "@/lib/i18n/locales/zh-cn.json";
import zhTw from "@/lib/i18n/locales/zh-tw.json";

function asDictionary(dictionary: unknown) {
  return dictionary as SiteDictionary;
}

const dictionaries: Record<Locale, SiteDictionary> = {
  "zh-cn": asDictionary(zhCn),
  "zh-tw": asDictionary(zhTw),
  en: asDictionary(en),
  ja: asDictionary(ja),
  ru: asDictionary(ru),
  es: asDictionary(es),
  pt: asDictionary(pt)
};

const pageKeywords: Record<Locale, Record<RouteKey, string[]>> = {
  "zh-cn": {
    home: ["中国采购服务", "中国出口执行", "中国运营支持", "中国落地支持", "中国招聘服务"],
    about: ["珠海贸易公司", "中国B2B服务公司", "中国采购合作伙伴简介"],
    products: ["中国3C电子出口", "中国工业计算机供应", "中国嵌入式系统采购"],
    contact: ["联系中国采购公司", "中国出口咨询", "珠海业务联系"],
    "sourcing-service": ["中国供应商核验", "中国采购代理", "供应商尽调"],
    "visa-relocation": ["中国签证咨询", "中国落地服务", "外籍人士来华安置"],
    "recruitment-service": ["中国招聘服务", "外籍人才招聘", "双语招聘支持"],
    "products-3c-export": ["中国3C出口服务", "消费电子采购", "电子出口单证"],
    "products-industrial-computers": ["工业电脑供应", "无风扇工控机", "嵌入式系统供应"]
  },
  "zh-tw": {
    home: ["中國採購服務", "中國出口執行", "中國營運支援", "中國落地支援", "中國招聘服務"],
    about: ["珠海貿易公司", "中國B2B服務公司", "中國採購合作夥伴簡介"],
    products: ["中國3C電子出口", "中國工業電腦供應", "中國嵌入式系統採購"],
    contact: ["聯絡中國採購公司", "中國出口諮詢", "珠海業務聯絡"],
    "sourcing-service": ["中國供應商核驗", "中國採購代理", "供應商盡職調查"],
    "visa-relocation": ["中國簽證諮詢", "中國落地服務", "外籍人士來華安置"],
    "recruitment-service": ["中國招聘服務", "外籍人才招聘", "雙語招聘支援"],
    "products-3c-export": ["中國3C出口服務", "消費電子採購", "電子出口文件"],
    "products-industrial-computers": ["工業電腦供應", "無風扇工控機", "嵌入式系統供應"]
  },
  en: {
    home: [
      "China sourcing service",
      "China export execution",
      "China operations support",
      "China relocation support",
      "China recruitment service"
    ],
    about: ["Zhuhai trading company", "China B2B service company", "China sourcing partner profile"],
    products: [
      "3C electronics export China",
      "industrial computer supplier China",
      "embedded systems sourcing China"
    ],
    contact: ["contact China sourcing company", "China export inquiry", "Zhuhai sourcing contact"],
    "sourcing-service": [
      "China supplier verification",
      "China sourcing agent",
      "supplier due diligence China"
    ],
    "visa-relocation": [
      "China visa consulting",
      "China relocation service",
      "foreign professional relocation China"
    ],
    "recruitment-service": [
      "China recruitment service",
      "foreign talent hiring China",
      "bilingual hiring China"
    ],
    "products-3c-export": ["3C export service China", "consumer electronics sourcing China", "electronics export documentation"],
    "products-industrial-computers": [
      "industrial pc supplier China",
      "fanless IPC sourcing China",
      "embedded systems supplier China"
    ]
  },
  ja: {
    home: ["中国調達サービス", "中国輸出実行", "中国業務支援", "中国定着支援", "中国採用支援"],
    about: ["珠海貿易会社", "中国B2B支援会社", "中国調達パートナー紹介"],
    products: ["中国3C電子輸出", "中国産業用コンピューター供給", "中国組み込みシステム調達"],
    contact: ["中国調達会社への問い合わせ", "中国輸出相談", "珠海ビジネス連絡"],
    "sourcing-service": ["中国サプライヤー検証", "中国調達代行", "サプライヤー精査"],
    "visa-relocation": ["中国ビザ相談", "中国定着支援", "外国人赴任支援"],
    "recruitment-service": ["中国採用支援", "外国人材採用", "バイリンガル採用支援"],
    "products-3c-export": ["中国3C輸出サービス", "民生電子調達", "電子輸出書類"],
    "products-industrial-computers": ["産業用PC供給", "ファンレスIPC", "組み込みシステム供給"]
  },
  ru: {
    home: ["услуги по закупкам в Китае", "сопровождение экспорта из Китая", "операционная поддержка в Китае", "релокация в Китай", "подбор персонала в Китае"],
    about: ["торговая компания в Чжухае", "B2B сервисная компания в Китае", "профиль партнера по закупкам в Китае"],
    products: ["экспорт электроники 3C из Китая", "поставщик промышленных компьютеров в Китае", "закупка встраиваемых систем в Китае"],
    contact: ["связаться с компанией по закупкам в Китае", "запрос по экспорту из Китая", "контакт в Чжухае"],
    "sourcing-service": ["проверка поставщиков в Китае", "агент по закупкам в Китае", "due diligence поставщиков"],
    "visa-relocation": ["визовый консалтинг по Китаю", "релокация в Китай", "переезд иностранных специалистов в Китай"],
    "recruitment-service": ["подбор персонала в Китае", "найм иностранных специалистов в Китае", "двуязычный найм в Китае"],
    "products-3c-export": ["экспорт 3C из Китая", "закупка потребительской электроники в Китае", "экспортная документация на электронику"],
    "products-industrial-computers": ["поставщик industrial pc в Китае", "fanless IPC в Китае", "поставщик встраиваемых систем в Китае"]
  },
  es: {
    home: ["servicio de compras en China", "gestión de exportación desde China", "soporte operativo en China", "reubicación en China", "reclutamiento en China"],
    about: ["empresa comercial en Zhuhai", "empresa B2B en China", "perfil de socio de compras en China"],
    products: ["exportación 3C desde China", "proveedor de ordenadores industriales en China", "abastecimiento de sistemas embebidos en China"],
    contact: ["contactar empresa de compras en China", "consulta de exportación en China", "contacto comercial en Zhuhai"],
    "sourcing-service": ["verificación de proveedores en China", "agente de compras en China", "debida diligencia de proveedores en China"],
    "visa-relocation": ["consultoría de visa para China", "servicio de reubicación en China", "reubicación de profesionales extranjeros a China"],
    "recruitment-service": ["servicio de reclutamiento en China", "contratación de talento extranjero en China", "contratación bilingüe en China"],
    "products-3c-export": ["servicio de exportación 3C en China", "abastecimiento de electrónica de consumo en China", "documentación de exportación electrónica"],
    "products-industrial-computers": ["proveedor de PC industrial en China", "IPC fanless en China", "proveedor de sistemas embebidos en China"]
  },
  pt: {
    home: ["serviço de compras na China", "gestão de exportação da China", "suporte operacional na China", "relocação para a China", "recrutamento na China"],
    about: ["empresa comercial em Zhuhai", "empresa B2B na China", "perfil de parceiro de compras na China"],
    products: ["exportação 3C da China", "fornecedor de computadores industriais na China", "aquisição de sistemas embarcados na China"],
    contact: ["contato com empresa de compras na China", "consulta de exportação da China", "contato comercial em Zhuhai"],
    "sourcing-service": ["verificação de fornecedores na China", "agente de compras na China", "due diligence de fornecedores na China"],
    "visa-relocation": ["consultoria de visto para a China", "serviço de relocação na China", "relocação de profissionais estrangeiros para a China"],
    "recruitment-service": ["serviço de recrutamento na China", "contratação de talentos estrangeiros na China", "contratação bilíngue na China"],
    "products-3c-export": ["serviço de exportação 3C da China", "aquisição de eletrônicos de consumo na China", "documentação de exportação eletrônica"],
    "products-industrial-computers": ["fornecedor de PC industrial na China", "IPC fanless na China", "fornecedor de sistemas embarcados na China"]
  }
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function getPageKeywords(locale: Locale, routeKey: RouteKey) {
  return Array.from(new Set([getDictionary(locale).pages[routeKey].metadata.title, ...pageKeywords[locale][routeKey]]));
}
