const quizContent = [
    // Has to start and end with 'info' type content
    {
        quizId: 'calories_quiz', // Unique identifier for this quiz
        content: [
            {
                type: 'info',
                text: 'Kalorijos yra energijos vienetas. Apžvelkime kalorijų svarbą mityboje.',
            },
            {
                type: 'quiz',
                question: 'Kas turi daugiau kalorijų?',
                options: ['Angliavandeniai', 'Proteinai', 'Riebalai', 'Vitaminai'],
                correctAnswer: 'Riebalai',
            },
            {
                type: 'info',
                text: 'Riebalai viename grame turi daugiau kalorijų už angliavandenius ir proteinus.',
            },
            {
                type: 'quiz',
                question: 'Kuris maistas turi mažai kalorijų?',
                options: ['Avokadas', 'Riešutai', 'Lapiniai žalumynai', 'Sūris'],
                correctAnswer: 'Lapiniai žalumynai',
            },
            {
                type: 'info',
                text: 'Aha',
            },
        ],
    },

    {
        quizId: 'carbs_quiz', // Another unique identifier for a different quiz
            content: [
            {
                type: 'info',
                text: 'Angliavandeniai yra esminiai makroelementai. Praplėskim žinias apie juos.',
            },
            {
                type: 'quiz',
                question: 'Kuris maistas turi daugiausiai kopleksinių angliavandenių?',
                options: ['Duona', 'Bananas', 'Ryžiai', 'Pilno grūdo gaminiai'],
                correctAnswer: 'Pilno grūdo gaminiai',
            },
            {
                type: 'info',
                text: 'Pilno grūdo gaminiai yra pilni kopleksinių angliavandenių, kurie suteikia ilgalaikę energiją.',
            },
        ],
    },
// Add more quizzes with their unique identifiers
{
    quizId: 'protein_quiz', // Another unique identifier for a different quiz
        content: [
        {
            type: 'info',
            text: 'Baltymas yra suformuotas iš 100 ar daugiau susijungusių amino rugščių. Sužinokime kur jų randama.',
        },
        {
            type: 'quiz',
            question: 'Kuris produktas turi daugiausia baltymų?',
            options: ['Blynai', 'Kumpis', 'Varškė', 'Bulvės'],
            correctAnswer: 'Varškė',
        },
        {
            type: 'info',
            text: 'Baltymai taip pat yra esminė gyvo organizmo dalis',
        },
    ],
},

{
    quizId: 'fats_quiz', // Another unique identifier for a different quiz
        content: [
        {
            type: 'info',
            text: 'Riebalai yra labai koncentruotas energijos šaltinis, nes suteikia daugiau energijos nei angliavandeniai ar batymai.',
        },
        {
            type: 'quiz',
            question: 'Kurių riebalų geriau vengti dėl jų neigiamo poveikio?',
            options: ['Omega-3 riebalų rūgščių', 'Transriebalų', 'Mononesočiūjų riebalų rūgščių'],
            correctAnswer: 'Transriebalų',
        },
        {
            type: 'info',
            text: 'Riebalai yra būtini A D E ir K vitaminų įsisavinimui.',
        },
        {
            type: 'quiz',
            question: 'Kuris maistas yra gerųjų riebalų šaltinis?',
            options: ['Bulvės', 'Blynai', 'Lašiša', 'Konservuoti vaisiai'],
            correctAnswer: 'Lašiša',
        },
        {
            type: 'info',
            text: 'Riebalai prisideda prie maisto sotumo jausmo, nes jie ilgiau išlieka skrandyje ir sulėtina maisto perėjimą per virškinimo traktą.',
        },
    ],
},

{
    quizId: 'fiber_quiz', // Another unique identifier for a different quiz
        content: [
        {
            type: 'info',
            text: 'Skaidulos yra neviškinami angliavandeniai, esantys maisto produktuose. Praplėskime žinias apie skaidulas',
        },
        {
            type: 'quiz',
            question: 'Kokia yra pagrindinė skaidulų funkcija organizmui',
            options: ['Padidina cholesterolio kiekį kraujyje', 'Mažina žarnyno judrumą', 'Suteikia organizmui nepilnavertišką maistą', 'Palaiko sveiką viškinimo traktą ir reguliuoja žarnyno veiklą'],
            correctAnswer: 'Palaiko sveiką viškinimo traktą ir reguliuoja žarnyno veiklą',
        },
        {
            type: 'info',
            text: 'Skaiduloms praeinant per virškinimo traktą jos patenka į žarnyną, kur tampa naudingais substratais gerosiomis žarnyno bakterijomis.',
        },
    ],
},

{
    quizId: 'hydration_quiz', // Another unique identifier for a different quiz
        content: [
        {
            type: 'info',
            text: 'Vanduo yra vienas svarbiausių organizmo elementų. Learn more about them.',
        },
        {
            type: 'quiz',
            question: 'Kokia yra pagrindinė vandens svarba organizme?',
            options: ['Energijos šaltinis', 'Medžiagų transportavimas', 'Lastelių stuktūros sudedamoji dalis', 'Hormonų gamyba'],
            correctAnswer: 'Lastelių stuktūros sudedamoji dalis',
        },
        {
            type: 'info',
            text: 'Vanduo padeda reguliuoti kūno temperatūrą bei padeda išsaugoti sveikus sąnarius ir sustiprina raumenis.',
        },
    ],
},

{
    quizId: 'supplements_quiz', // Another unique identifier for a different quiz
        content: [
        {
            type: 'info',
            text: 'Maisto papildai aprūpina organizmą optimaliai sveikatai reikalingų maisto medžiagų kiekiu.',
        },
        {
            type: 'quiz',
            question: 'Kuris iš šių maisto papildų yra dažnai vartojamas sporto veiklos metu siekiant padidinti raumenų masę?',
            options: ['Vitaminas C', 'Kreatinas', 'Omega-3 riebalų rūgštys', 'Vitaminas D'],
            correctAnswer: 'Kreatinas',
        },
        {
            type: 'info',
            text: 'Tinkamas įvairių vitaminų vartojimas iš įvairių maisto šaltinių yra svarbus siekiant išlaikyti sveiką gyvenseną ir gerą sveikatą.',
        },
        {
            type: 'quiz',
            question: 'Kokia vitamino C funkcija organizme?',
            options: ['Stiprina imuninę sistemą', 'Apsaugo nuo ligų', 'Palaiko sveiką odą ir plaukus', 'Palaiko sveiką širdį ir kraujagislių sistemą'],
            correctAnswer: 'Stiprina imuninę sistemą',
        },
        {
            type: 'info',
            text: 'Geriausia gauti maistines medžiagas iš įvairių maisto šaltinių, įskaitant vaisius, daržoves, grūdus, baltymus ir sveikus riebalus.',
        },
    ],
},

{
    quizId: 'exercise_types_quiz', // Another unique identifier for a different quiz
        content: [
        {
            type: 'info',
            text: 'Įvairių sporto treniruočių įtraukimas į kasdienį gyvenimą gali padėti išlaikyti gerą fizinę ir psichinę sveikatą.',
        },
        {
            type: 'quiz',
            question: 'Kokia treniruočių rūšis geriausiai stiprina širdies ir kraujagyslių sistemą?',
            options: ['Jėgos treniruotės', 'Kardio treniruotės', 'Lankstumo pratimai', 'Lengvoji atletika'],
            correctAnswer: 'Kardio treniruotės',
        },
        {
            type: 'info',
            text: 'Kardio treniruotės - bėgimas, dviračio minimas ar plaukimas',
        },
        {
            type: 'quiz',
            question: 'Kokia treniruočių rūšis padeda pagerinti sąnarių lankstumą ir judrumą?',
            options: ['Jėgos treniruotės', 'Kardio treniruotės', 'Lankstumo pratimai', 'Lengvoji atletika'],
            correctAnswer: 'Lankstumo pratimai',
        },
        {
            type: 'info',
            text: 'Lankstumo pratimai - joga ar pilatesas.',
        },
    ],
},

{
    quizId: 'eating_time_quiz', // Another unique identifier for a different quiz
        content: [
        {
            type: 'info',
            text: 'Mitybos įpročiai ir maisto suvartojimo laikas gali turėti įtakos tiek fiziniai, tiek psichiniai mūsų sveikatai.',
        },
        {
            type: 'quiz',
            question: 'Kodėl svarbu laikytis reguliaraus valgymo laiko?',
            options: [' Visi variantai tinka', 'Sumažinti alkio jausmą', 'Išlaikyti stabilų energijos lygį', 'Kontroliuoti svorį'],
            correctAnswer: 'Visi variantai tinka',
        },
        {
            type: 'info',
            text: 'Svarbu stengtis laikytis reguliarių valgymo laikų ir vengti valgio prieš miegą, kad būtų palaikomas sveikas ir subalansuotas gyvenimo būdas.',
        },
    ],
},

{
    quizId: 'meal_planing_quiz', // Another unique identifier for a different quiz
        content: [
        {
            type: 'info',
            text: 'Maisto planavimas yra esminis sveiko gyvenimo būdo aspektas.',
        },
        {
            type: 'quiz',
            question: 'Kodėl svarbu planuoti savo valgiaraštį?',
            options: ['Norint kontroliuoti svorį', 'Visi variantai tinka', 'Norint sutaupyti pinigus', 'Norint užtikrinti subalansuotą mitybą'],
            correctAnswer: 'Visi variantai tinka',
        },
        {
            type: 'info',
            text: 'Maisto planavimas yra svarbu norint, kad mityba būtų subalansuota ir sveika.',
        },
    ],
},

{
    quizId: 'obsesity_quiz', // Another unique identifier for a different quiz
        content: [
        {
            type: 'info',
            text: 'Nutukimas yra būklė, kurioje organizmas turi per daug riebalų.',
        },
        {
            type: 'quiz',
            question: 'Kokie veiksniai gali prisidėti prie nutukimo?',
            options: ['Per didelis kalorijų suvartojimas', 'Nepakankama fizinė veikla', 'Genetiniai veiksniai', 'Visi variantai tinka'],
            correctAnswer: 'Visi variantai tinka',
        },
        {
            type: 'info',
            text: 'Nutukimas gali turėti rimtų pasekmių sveikatai.',
        },
        {
            type: 'quiz',
            question: 'Kokios yra nutukimo sveikatos pasekmės?',
            options: ['Padidėjusi širdies ligų ir diabeto rizika', 'Sąnarių problemos', 'Visi variantai tinka', 'Psichinės sveikatos sutrikimai'],
            correctAnswer: 'Visi variantai tinka',
        },
        {
            type: 'info',
            text: 'Nutukimas yra kompleksinė sveikatos problema, kuri dažnai susijusi su per dideliu kalorijų suvartojimu, nepakankama fizinė veikla ir genetiniais veiksniais.',
        },
        {
            type: 'quiz',
            question: 'Ką galima daryti norint prevencijuoti ar gydyti nutukimą?',
            options: ['Subalansuoti mitybą ir padidinti fizinį aktyvumą', 'Visi variantai tinka', 'Vartoti daugiau riebalų ir angliavandenių', 'Valgyti daugiau greito maisto'],
            correctAnswer: 'Subalansuoti mitybą ir padidinti fizinį aktyvumą',
        },
        {
            type: 'info',
            text: 'Pagrindinis nutukimo rodiklis yra kūno masės indeksas.',
        },
    ],
},

{
    quizId: 'anorexia_quiz', // Another unique identifier for a different quiz
        content: [
        {
            type: 'info',
            text: 'Anoreksija yra rimta valgymo sutrikimo forma.',
        },
        {
            type: 'quiz',
            question: 'Kokie yra pagrindiniai anoreksijos simptomai?',
            options: ['Didelis alkis ir dažnas valgymas', 'Obsesinis noras numesti svorio ir maisto suvartojimo apribojimas', 'Nepakankama fizinė veikla', 'Visi variantai tinka'],
            correctAnswer: 'Obsesinis noras numesti svorio ir maisto suvartojimo apribojimas',
        },
        {
            type: 'info',
            text: 'Anoreksija dažnai siejama su iškreiptu kūno vaizdu, kai žmogus jaučia, kad yra nutukęs arba turėtų būti daug lieknesnis, nepaisant realios kūno masės ar formos',
        },
        {
            type: 'quiz',
            question: 'Kokie gali būti anoreksijos gydymo metodai?',
            options: ['Psichoterapija ir mitybos patarimai', 'Visi variantai tinka', 'Vaistai nuo svorio mažinimo', 'Fizinis krūvis ir intensyvi treniruotė'],
            correctAnswer: 'Psichoterapija ir mitybos patarimai',
        },
        {
            type: 'info',
            text: 'Svarbu suprasti, kad anoreksija yra sudėtinga būklė, kuri dažnai reikalauja profesionalios psichoterapijos, medicininės pagalbos ir palaikymo iš artimųjų.',
        },
        {
            type: 'quiz',
            question: 'Koks yra pagrindinis anoreksijos gydymo tikslas?',
            options: ['Visi variantai tinka', 'Greitai priversti žmogų vartoti daugiau maisto', 'Sugrąžinti normalų svorį ir sudaryti sveiką santykį su maistu', 'Skatinti dar didesnį svorio kritimą'],
            correctAnswer: 'Sugrąžinti normalų svorį ir sudaryti sveiką santykį su maistu',
        },
        {
            type: 'info',
            text: 'Anoreksija gali turėti sunkių pasekmių sveikatai.',
        },
    ],
},

{
    quizId: 'emotional_eating_quiz', // Another unique identifier for a different quiz
        content: [
        {
            type: 'info',
            text: 'Emocinis valgymas yra mitybos elgesio forma.',
        },
        {
            type: 'quiz',
            question: 'Kas yra emocinis valgymas?',
            options: ['Valgymo sutrikimas, kai žmogus valgo per mažai', 'Valgymo sutrikimas, kai žmogus valgo per daug', 'Valgymo elgesys, kai žmogus valgo dėl emocinių poreikių, o ne dėl fizinio alkio', 'Valgymo elgesys, kai žmogus valgo tik sveikus maisto produktus'],
            correctAnswer: 'Valgymo elgesys, kai žmogus valgo dėl emocinių poreikių, o ne dėl fizinio alkio',
        },
        {
            type: 'info',
            text: 'Žmonės gali naudoti maistą kaip būdą reguliuoti savo emocijas arba sumažinti stresą.',
        },
        {
            type: 'quiz',
            question: 'Kokios gali būti emocinio valgymo pasekmės?',
            options: ['Nutukimas ir nepageidaujamas svorio svyravimas', 'Depresija ir sumažėjusi savivertė', 'Kaltės ir gėdos pojūtis po valgymo', 'Visi variantai tinka'],
            correctAnswer: 'Visi variantai tinka',
        },
        {
            type: 'info',
            text: 'Emocinis valgymas gali turėti žalingų pasekmių fizinei ir psichologinei sveikatai',
        },
        {
            type: 'quiz',
            question: 'Kaip galima įveikti emocinį valgymą?',
            options: ['Visi variantai tinka', 'Rasti alternatyvius būdus reguliuoti emocijas ir stresą', ' Išlaikyti skaidrią mitybą ir subalansuotą gyvenimo būdą', 'Ieškoti profesionalios pagalbos, pvz., psichoterapijos'],
            correctAnswer: 'Visi variantai tinka',
        },
        {
            type: 'info',
            text: 'Svarbu atpažinti šį elgesį ir ieškoti sveikesnių būdų valdyti emocijas ir stresą.',
        },
    ],
},

];

export default quizContent;
