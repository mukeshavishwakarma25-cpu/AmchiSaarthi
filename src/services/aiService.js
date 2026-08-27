import { mockKnowledgeBase } from '../data/mockKnowledgeBase';

export const aiService = {
  isAvailable: true,

  setAvailability: (status) => {
    aiService.isAvailable = status;
  },

  askAssistant: async (query, lang = 'en') => {
    await new Promise((res) => setTimeout(res, 600));

    if (!aiService.isAvailable) {
      return {
        success: false,
        error: 'AI_UNAVAILABLE',
        message: 'The AI Compliance Assistant service is currently undergoing routine maintenance. Please refer to the official Knowledge Base articles or contact Department Helpdesk.'
      };
    }

    const q = query.toLowerCase();

    // RAG matching logic with citations
    let answer = '';
    let sources = [];

    if (q.includes('shop') || q.includes('establishment') || q.includes('gumasta') || q.includes('trade')) {
      answer = lang === 'hi' 
        ? 'दुकान एवं स्थापना (गुमास्ता) पंजीकरण या व्यापार लाइसेंस महाराष्ट्र नगर निगम अधिनियम के तहत आवश्यक है। यदि आप 10 से कम कर्मचारी रखते हैं तो सरल ऑनलाइन सूचना (Intimation) पर्याप्त है।'
        : lang === 'mr'
        ? 'दुकान आणि आस्थापना नोंदणी (गुमास्ता परवाना) महाराष्ट्र महानगरपालिका कायद्यांतर्गत आवश्यक आहे. १० पेक्षा कमी कर्मचारी असल्यास केवळ ऑनलाइन पूर्वसूचना पुरेशी आहे.'
        : 'Under the Maharashtra Shops and Establishments (Regulation of Employment and Conditions of Service) Act, 2017, all commercial establishments with 10 or more workers must obtain a formal registration certificate. Establishments with fewer than 10 workers require only online Intimation.';
      sources = [
        { title: 'Maharashtra Shops & Establishments Act 2017 - Rule 4', url: 'https://industry.maharashtra.gov.in' },
        { title: 'Municipal Corporation Commercial Clearance Guidelines', url: '#' }
      ];
    } else if (q.includes('fire') || q.includes('noc') || q.includes('safety')) {
      answer = lang === 'hi'
        ? 'अग्निशमन विभाग से अनापत्ति प्रमाण पत्र (Fire NOC) 500 वर्ग मीटर से अधिक क्षेत्रफल वाले कारखानों या ज्वलनशील पदार्थों के भंडारण वाले प्रतिष्ठानों के लिए अनिवार्य है।'
        : lang === 'mr'
        ? 'अग्निशामक दलाचे ना-हरकत प्रमाणपत्र (Fire NOC) ५०० चौ.मी. पेक्षा जास्त क्षेत्रफळ असलेल्या किंवा ज्वलनशील पदार्थांचा वापर करणाऱ्या आस्थापनांसाठी बंधनकारक आहे.'
        : 'Provisional Fire NOC is required prior to building construction plan sanction. Final Fire NOC is issued upon physical site inspection of hydrants, alarm panels, and emergency egress dimensions.';
      sources = [
        { title: 'Maharashtra Fire Prevention & Life Safety Measures Act', url: '#' },
        { title: 'Directorate of Fire Services Standard Operating Procedures', url: '#' }
      ];
    } else if (q.includes('pollution') || q.includes('mpcb') || q.includes('consent') || q.includes('cte') || q.includes('cto')) {
      answer = lang === 'hi'
        ? 'महाराष्ट्र प्रदूषण नियंत्रण बोर्ड (MPCB) उद्योगों को लाल, नारंगी, हरा और सफेद श्रेणियों में वर्गीकृत करता है। नारंगी श्रेणी के लिए स्थापना पूर्व CTE और संचालन पूर्व CTO अनिवार्य है।'
        : lang === 'mr'
        ? 'महाराष्ट्र प्रदूषण नियंत्रण मंडळ (MPCB) उद्योगांचे वर्गीकरण लाल, नारंगी, हिरवा व पांढरा श्रेणीत करते. नारंगी श्रेणीसाठी CTE व CTO मंजुरी आवश्यक आहे.'
        : 'MPCB categorizes industrial activities into Red, Orange, Green, and White based on Pollution Index score. Units requiring CTE must submit water balance diagrams and Effluent Treatment Plant (ETP) schemes.';
      sources = [
        { title: 'MPCB Categorization Guidelines 2020', url: 'https://mpcb.gov.in' },
        { title: 'Water & Air (Prevention & Control of Pollution) Acts', url: '#' }
      ];
    } else {
      answer = lang === 'hi'
        ? `आपके प्रश्न "${query}" के संबंध में: महाराष्ट्र एकल-खिड़की प्रणाली (MAITRI / आमची सारथी) सभी विभागों की अनुमतियों को चरणबद्ध तरीके से ट्रैक करने और सुगम बनाने के लिए बनाई गई है। कृपया अपनी व्यवसाय प्रोफ़ाइल पूरी करें ताकि सटीक रोडमैप तैयार किया जा सके।`
        : lang === 'mr'
        ? `आपल्या "${query}" या प्रश्नाबाबत: महाराष्ट्र एकात्मिक व्यवसाय प्रणाली (आमची सारथी) अंतर्गत सर्व शासकीय परवानग्या टप्प्याटप्प्याने मिळवता येतात. आपल्या व्यवसायाची अचूक माहिती भरून compliance roadmap तपासा.`
        : `Regarding your query "${query}": AmchiSaarthi single-window platform orchestrates all statutory clearances under the Government of Maharashtra Ease of Doing Business framework. Please complete your Business Profile to receive a customized regulatory roadmap with verified fee schedules.`;
      sources = [
        { title: 'Maharashtra Industry & Investment Policy Framework', url: 'https://industry.maharashtra.gov.in' }
      ];
    }

    return {
      success: true,
      query,
      answer,
      disclaimer: 'AI-generated response is advisory and designed for informational guidance. Final statutory authority rests with designated Government Review Officers.',
      sources,
      timestamp: new Date().toISOString()
    };
  },

  analyzeDocument: async (docName) => {
    await new Promise((res) => setTimeout(res, 500));
    return {
      certificateName: docName.replace('.pdf', ''),
      confidenceScore: 0.96,
      extractedData: {
        entityName: 'GreenTech Solutions Pvt Ltd',
        validity: 'Active',
        authority: 'State of Maharashtra'
      },
      flags: []
    };
  }
};
