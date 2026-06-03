/**
 * Worship Community Songpool - 30 Songs Database
 * This file contains structured metadata and bracketed chord charts for each song.
 * Bracketed chords (e.g. [G]) are dynamically parsed and transposed by the application.
 */

const SONGS = [
  {
    id: "chum-zu-mir",
    title: "Chum zu mir",
    author: "Damaris Baldinger, Stefan Röthlisberger, Christa Michelle Bucherer",
    key: "C",
    bpm: 81,
    timeSig: "4/4",
    theme: "Anbetung",
    language: "de-ch",
    ccli: 7214213,
    youtube: "https://www.youtube.com/results?search_query=VIBE+Chum+zu+mir",
    chords: `[Intro]
[C] / / / | / / / / | / / / / | / / / /

[Verse 1]
[C]Umschlosse vo Dire Liebi
[C/E]Behüetet dür Dini Hand
[F]Wag’ i e nächste Schritt
[Gsus4]Ine nöie Tag
[C]Geborge i Dire Wermi
[C/E]Umwicklet vo Dire Gnad
[F]Schnuufen ig ii und uus
[Gsus4]Gibe mi nid uuf

[Pre-Chorus]
[F](Da isch) ke Schleier meh zwüsche Dir u mir
[G]Ke Vorhang wo üs trennt
[C/E]Ke Fluech wo mi uf Abstand häbt
[F]Ke Blick wo mi nid vertreit
[F]Nume usgstreckti Arme
[G]U ne Stimm wo zärtlich seit

[Chorus]
[C]Chum zu mir
[C/E]La di a mire Gnad la gnüege
[F]Chum zu mir
[Dm]I wott di [G]sterche und erfrüsche
[C]Iss vo mir
[C/E]I bi das Brot wo nie meh usgeit
[F]Trink vo mir
[G]Bis vou vo mir

[Channel 1]
[C] / / / | / / / /

[Verse 2]
[C]Ergriffe vo Dire Güeti
[C/E]Verwurzlet i Dine Wort
[F]Mache i mi uuf für Di
[Gsus4]Du bisch hie bi mir
[C]Daheime i Dire Nechi
[C/E]Verbunde mit Dire Chraft
[F]Richt’i mi wider uuf
[Gsus4]Läbe fliesst dür mi

[Pre-Chorus]

[Chorus (2x)]

[Bridge]
[F]Dä Momänt
[C/E]Woni ändlech loslah
[Dm]‘S nümm säuber [C]mache z’ga
[Bb]Dir aues überlah
[Bb]Jetz chunnt die beschti Zit
[G]Wüu Du hesch übernoh

[Chorus (2x)]

[Channel 1]
[C] / / / | [C/E] / / / | [F] / / / | [Dm] / [G] /
[C] / / / | [C/E] / / / | [F] / / / | [G] / / / | [C] / / / /`
  },
  {
    id: "danke-fuer-dis-chruez",
    title: "Danke für dis Chrüz",
    author: "Conny Guida",
    key: "G",
    bpm: 68,
    theme: "Lobpreis / Dankbarkeit",
    language: "de-ch",
    youtube: "https://www.youtube.com/results?search_query=Conny+Guida+Danke+f%C3%BCr+dis+Chr%C3%BCz",
    chords: `[Verse 1]
[G]Danke für dis [D]Chrüz, oh Herr
[Em]Danke für dr [C]Priis, wo du bezahlt hesch
[G]Dini Gnad isch [D]grösser als mini [Em]Sünd [C]

[Chorus]
[G]Du bisch heilig, [D]heilig, Herr
[Em]Dank dir dörf ich [C]vor dir stoh
[G]Danke Jesus [D]für dis Opfer
[Em]Du hesch mi er[C]löst

[Verse 2]
[G]Du hesch dr Vorhang [D]ufgerisse
[Em]Dr Wäg isch [C]frei zum Vatergott
[G]Halleluja, [D]dein Name sig ge[Em]lobt [C]`
  },
  {
    id: "der-sunne-entgaege",
    title: "Der Sunne entgäge",
    author: "AUDIEL",
    key: "E",
    bpm: 80,
    theme: "Freude / Weg mit Gott",
    language: "de-ch",
    youtube: "https://www.youtube.com/results?search_query=AUDIEL+Der+Sunne+entg%C3%A4ge",
    chords: `[Verse 1]
[E]Ich loufe der [B]Sunne entgäge
[C#m]Dini Liebi wärmt mis [A]Härz
[E]Jede Schritt mit [B]dir zäme
[C#m]Vertriibt dr ganze [A]Schmärz

[Chorus]
[E]Du bisch mis Liecht, mi [B]Wäg
[C#m]Du bringsch dr neu [A]Tag
[E]Mit dir hani [B]keini Angst meh
[C#m]Was dr Morge o [A]bringä mag

[Verse 2]
[E]I dr Dunkelheit [B]vom Läbe
[C#m]Bisch du dr Fixstärn, [A]wo mir lücht't
[E]Dini Tröii isch [B]unerschütterlich
[C#m]Bis dr Schatte [A]wicht`
  },
  {
    id: "du-bisch-mi-gott",
    title: "Du bisch mi Gott",
    author: "Romano Soltermann",
    key: "D",
    bpm: 70,
    theme: "Anbetung / Hingabe",
    language: "de-ch",
    youtube: "https://www.youtube.com/results?search_query=Romano+Soltermann+Du+bisch+mi+Gott",
    chords: `[Verse 1]
[D]Du bisch mi Gott, i [A]bäte di a
[Bm]Nüt uf däre Wält cha di [G]jemals ersetze
[D]Mis Läbe ghört dir [A]ganz und gar
[Bm]Halt mi fescht in [G]diner Hand

[Chorus]
[D]I singe dir es [A]Lied vo Liebi
[Bm]I beuge mini [G]Chneu vor dir
[D]Allmächtige [A]Schöpfer, Retter
[Bm]Du bisch mi [G]Gott

[Verse 2]
[D]In Sturmzyte [A]bisch du mi Fels
[Bm]In Trubsuu [G]bisch du mi Troscht
[D]I vertroue [A]uf dis Wort
[Bm]Du versprichsch [G]dass d'bi mir bisch`
  },
  {
    id: "gross-usecho",
    title: "Gross usecho",
    author: "AudiEL",
    key: "A",
    bpm: 108,
    theme: "Feier / Upbeat",
    language: "de-ch",
    youtube: "https://www.youtube.com/results?search_query=AudiEL+Gross+usecho",
    chords: `[Verse 1]
[A]Hüt wämmer [E]fiiere und danke
[F#m]Dini Gnad het uns [D]befreit
[A]Gross usecho [E]isch dis Wärk in uns
[F#m]Du hesch e neue [D]Wäg bereit't

[Chorus]
[A]Mir rüefe luut [E]zu dir
[F#m]Du bisch dr [D]König hüt und ewig
[A]Dini Herrlichkeit [E]erfüllt dr Ruum
[F#m]Mir beuge uns [D]vor dir

[Verse 2]
[A]Dini Liebi [E]strömt dur d'Gasse
[F#m]Dini Chraft isch [D]überau
[A]Alli Völker [E]wärde di lobe
[F#m]Jedes Härz git dir [D]Ehre`
  },
  {
    id: "gwautigi-liebi",
    title: "Gwautigi Liebi",
    author: "Eden",
    key: "G",
    bpm: 72,
    theme: "Anbetung / Liebe Gottes",
    language: "de-ch",
    youtube: "https://www.youtube.com/results?search_query=Eden+Gwautigi+Liebi",
    chords: `[Verse 1]
[G]Gwautigi Liebi, [D]döif wie ds Meer
[Em]Dini Gnad strömt [C]über mi
[G]Hesch alles gäh, [D]dasses mir guet geit
[Em]I bi für [C]immer di

[Chorus]
[G]Gross isch dini [D]Tröii, Vater
[Em]Unendlich dini [C]Macht
[G]Dini Liebi [D]schint so hell
[Em]Dur die [C]dunkelsti Nacht

[Verse 2]
[G]Kei Verdammnis [D]gits meh für mi
[Em]I dr Freiheit [C]loufe ich jetzt
[G]Du hesch d'Chettene [D]sprängt
[Em]Mis Härz isch [C]neu verpackt`
  },
  {
    id: "heilig-bisch-du-herr",
    title: "Heilig bisch du Herr",
    author: "Romano Soltermann",
    key: "C",
    bpm: 65,
    theme: "Anbetung / Heiligkeit",
    language: "de-ch",
    youtube: "https://www.youtube.com/results?search_query=Romano+Soltermann+Heilig+bisch+du+Herr",
    chords: `[Verse 1]
[C]Heilig bisch [G]du, Herr vo [Am]därä Wält
[F]Dini Herrlichkeit isch [C]überau sichtbar
[C]Ängel singe [G]dir, mir stimme [Am]ii
[F]Erhaben und [G]voll Gnad

[Chorus]
[C]Heilig, [G]heilig, [Am]heilig bisch du [F]Herr
[C]Dini Liebi [G]hört nie [Am]uf [F]
[C]Wirdi ewig [G]bäte [Am]di a, mi [F]Gott
[Dm]Heilig bisch [G]du, Herr

[Verse 2]
[C]Mis Härz brännt [G]für di, oh König
[Am]I dihei find [F]ich bi dir
[C]Für immer [G]wott i di lobe
[Am]Dini Liebi [F]strömt in mir`
  },
  {
    id: "heilig-fuer-immer",
    title: "Heilig für immer / Holy Forever",
    author: "Bethel",
    key: "G",
    bpm: 72,
    theme: "Anbetung / Majestät",
    language: "de-ch",
    youtube: "https://www.youtube.com/results?search_query=Bethel+Holy+Forever",
    chords: `[Verse 1]
[G]Tusig Generatione [C]stönd vor [G]dir
[Em]Singe es [D]Lied, wo ewig [C]blibt
[G]Und alli Erlöste rüefe [C]Lieder [G]zue
[Em]Und singe vo [D]diner Herr[C]lichkeit

[Pre-Chorus]
[C]Dine Name stoht [D]über allem
[Em]Dine Name isch [Am]gross und starch
[C]Alli Chneu wärde [D]sich beuge

[Chorus]
Singe [C]heilig, [G]heilig
Die ganze Schöp[Em]fig singt [D]heilig
[C]Hoch erhobe [G]bisch du
Du blibsch [Em]heilig [D]für immer

[Verse 2]
[G]Du bisch de Retter, [C]wo üs Gnad [G]verspricht
[Em]Dank dir dörfe [D]mir vor dr Thron [C]stoh
[G]Mit dr Ängelschar [C]stämme mir [G]i
[Em]Du regiersch in [D]Gerechtigkeit [C]`
  },
  {
    id: "heiligi-drueeinigkeit",
    title: "Heiligi Drüeinigkeit",
    author: "Yahu",
    key: "Am",
    bpm: 75,
    theme: "Dreifaltigkeit / Anbetung",
    language: "de",
    youtube: "https://www.youtube.com/results?search_query=Yahu+Heiligi+Dr%C3%BCeinigkeit",
    chords: `[Verse 1]
[Am]Vater im Himmel, wir [F]bäten dich an
[C]Jesus, dein Sohn, der den [G]Sieg für uns gewann
[Am]Heiliger Geist, komm er[F]fülle uns neu
[C]Drüeinigkeit Gottes, du [G]bleibst uns treu

[Chorus]
[F]Heilig, [C]heilig [G]bist du Herr
[F]Dreimal [C]heilig [G]Gott und König
[Am]Dir gehört [F]unser Lob und [C]Preis [G]
[F]Heiligi [G]Drüeinig[Am]keit

[Verse 2]
[Am]In Einheit verbunden [F]loben wir dich
[C]Deine Gemeinde [G]erhebt dich ewiglich
[Am]Giess deine Liebe [F]in unsere Herzen aus
[C]Und mach uns zu [G]deinem Haus`
  },
  {
    id: "i-chumae-a-dae-ort",
    title: "I chumä a dä Ort",
    author: "Joël Mürner",
    key: "D",
    bpm: 68,
    theme: "Intimität / Stiller Ort",
    language: "de-ch",
    youtube: "https://www.youtube.com/results?search_query=Jo%C3%ABl+M%C3%BCrner+I+chum%C3%A4+a+d%C3%A4+Ort",
    chords: `[Verse 1]
[D]I chumä a dä [A/C#]Ort vo diner [Bm]Gägäwart [G]
[D]Wo alles andäre [A/C#]lyys und unwich[Bm]tig wird [G]
[D]I gseh dis Gsicht, [A/C#]gspüre dini [Bm]Liebi [G]
[Em]Hie bin i [A]dihei

[Chorus]
[D]Hie an [A/C#]däm Ort [Bm]vor dir [G]
[D]Wo mis [A/C#]Härz Rueh [Bm]findt in [G]dir
[Bm]Dini Liebi [A]schmilzt mini [G]Angscht wäg
[Em]I beuge mi vor [A]dir, mi Gott

[Verse 2]
[D]Dis Wort redt [A/C#]Liebi und [Bm]Wohret in mi [G]i
[D]Du heilsch mini [A/C#]Wunde, be[Bm]freisch mi vo dr [G]Pii
[D]I dr Stilli [A/C#]erkenne i, [Bm]dass du Gott [G]bisch
[Em]Hie an [A]däm Ort`
  },
  {
    id: "i-love-our-presence",
    title: "I love our presence",
    author: "Vineyard International",
    key: "D",
    bpm: 72,
    theme: "Gegenwart / Ruhe",
    language: "en",
    youtube: "https://www.youtube.com/results?search_query=Vineyard+I+love+your+presence",
    chords: `[Verse 1]
[D]In the quiet [G/B]of the morning
[D]I will look [G/B]for Your face
[D]In the shadow [G/B]of Your presence
[D]I will rest [G/B]in Your grace

[Chorus]
[D]I love Your [G]presence, Lord
[Bm]I love to [A]worship You
[D]Here in Your [G]holy place
[Bm]You make all [A]things new

[Verse 2]
[D]When the world is [G/B]loud around me
[D]You're the peace inside [G/B]my mind
[D]In the refuge [G/B]of Your mercy
[D]Perfect shelter [G/B]I will find`
  },
  {
    id: "i-will-exalt",
    title: "I will exalt",
    author: "Amanda Cook",
    key: "G",
    bpm: 74,
    theme: "Anbetung / Zuflucht",
    language: "en",
    youtube: "https://www.youtube.com/results?search_query=Amanda+Cook+I+will+exalt",
    chords: `[Verse 1]
[G]Your presence is [C]all I need
[Em]Your presence is [D]all I want
[G]You are my [C]shelter, my strength
[Em]I am secure in [D]Your love

[Chorus]
[G]I will exalt You, [C]Lord, I will exalt You
[Em]For You have [D]rescued my soul
[G]I will exalt You, [C]Lord, I will exalt You
[Em]Your name is [D]above all names

[Verse 2]
[G]Through every storm [C]You are faithful
[Em]Your promise will [D]never fail
[G]My anchor remains [C]in the heavens
[Em]Over my fears [D]You prevail`
  },
  {
    id: "jesus-jesus-heilig-und-gesalbt",
    title: "Jesus, Jesus, heilig und gesalbt",
    author: "Vineyard International",
    key: "G",
    bpm: 68,
    theme: "Anbetung / Name Jesu",
    language: "de",
    youtube: "https://www.youtube.com/results?search_query=Jesus+Jesus+heilig+und+gesalbt",
    chords: `[Verse 1]
[G]Jesus, [Bm]Jesus,
[C]heilig und ge[G]salbt,
[D]Jesus. [C] [G]
[G]Jesus, [Bm]Jesus,
[C]auferstand'ner [G]Herr,
[D]Jesus. [C] [G]

[Chorus]
Dein [C]Name ist wie [G]Honig auf dem Mund,
dein [C]Geist ist wie [G]Wasser für die Seel',
dein [C]Wort ist ein [Em]Licht auf meinem Weg.
[C]Jesus, ich [D]liebe dich.

[Verse 2]
[G]Jesus, [Bm]Jesus,
[C]Retter meiner [G]Seele,
[D]Jesus. [C] [G]
[G]Jesus, [Bm]Jesus,
[C]Führer meines [G]Lebens,
[D]Jesus. [C] [G]`
  },
  {
    id: "let-your-glory-fall",
    title: "Let Your Glory Fall",
    author: "David Ruis",
    key: "C",
    bpm: 76,
    theme: "Reich Gottes / Erweckung",
    language: "en",
    youtube: "https://www.youtube.com/results?search_query=David+Ruis+Let+Your+Glory+Fall",
    chords: `[Verse 1]
[C]Father of [F]creation, [G]fold us in Your [C]arms
[F]Send us out [C/E]to go, in the [Dm7]power of Your [G]name
[C]May Your [F]kingdom come, [G]may Your will be [Am]done
[F]Here on the [C]earth, as [Dm7]it is in [G]heaven

[Chorus]
[C]Let Your [F]glory fall, [G]let Your [C]glory fall
[F]Let Your [C/E]presence fill this [Dm7]temple now [G]
[Am]Arise, oh [F]Lord, in Your [G]power and Your [C]might
[F]Fill us [G]with Your [C]grace

[Verse 2]
[C]Spirit of the [F]Sovereign Lord, [G]come and touch our [C]hearts
[F]Set the captives [C/E]free, let the [Dm7]broken be re[G]stored
[C]Pour Your oil [F]of joy, [G]let Your fire [Am]burn
[F]Bring your healing [C]tide, [Dm7]pour out on [G]us`
  },
  {
    id: "lob",
    title: "Lob",
    author: "Eden",
    key: "G",
    bpm: 120,
    theme: "Feier / Lobpreis",
    language: "de-ch",
    youtube: "https://www.youtube.com/results?search_query=Eden+Lob",
    chords: `[Verse 1]
[G]Es Lied vo Lob [C]stygt uf zu dir
[Em]Du hesch üs [D]erlöst und befreit
[G]Mit Gsang und [C]Tanz fiiere mir
[Em]Dini Herrlichkeit in [D]Ewigkeit

[Chorus]
[G]Mir lobe di, oh [C]grosser Gott
[Em]Dank dir isch [D]dr Tod besiegt
[G]Mir rüefe luut [C]Halleluja
[Em]Singe vo diner [D]Liebi ewiglich

[Verse 2]
[G]Du bisch üsi [C]Sicherteit, Herr
[Em]Dini Hand [D]trägt uns durn Tag
[G]Nüüt cha üs [C]tucke, wenn du bi uns bisch
[Em]Hüt bezeuge mir [D]dini Chraft`
  },
  {
    id: "queue",
    title: "Queue",
    author: "VIBE",
    key: "F",
    bpm: 76,
    theme: "Warten / Vertrauen",
    language: "de-ch",
    youtube: "https://www.youtube.com/results?search_query=VIBE+Queue",
    chords: `[Verse 1]
[F]Hinder dir [C]loufe ich nah
[Dm]In dr Schlange [Bb]wart ich uf di
[F]Du wüssisch [C]wo dr Wäg düre geit
[Dm]Dis Wort isch [Bb]mis Gländer

[Chorus]
[F]I bi [C]bereit zum warte
[Dm]I stah [Bb]in diner Queue
[F]Dini Ziit isch [C]die beschti Ziit
[Dm]Mis Härz het [Bb]bi dir Rueh

[Verse 2]
[F]Auch wenn es [C]langsam vorwärts geit
[Dm]I vertroue, [Bb]dass du di Wort haltisch
[F]Dini Hand isch [C]mini Seiligheit
[Dm]Halt mi fescht, [Bb]ohni Ändi`
  },
  {
    id: "stroeme-lebendigen-wassers",
    title: "Ströme lebendigen Wassers",
    author: "A. Frey",
    key: "G",
    bpm: 92,
    theme: "Heiliger Geist / Erweckung",
    language: "de",
    youtube: "https://www.youtube.com/results?search_query=A.+Frey+Str%C3%B6me+lebendigen+Wassers",
    chords: `[Verse 1]
[G]Komm, Heiliger [C]Geist, wie ein [G]Strömender Regen
[Em]Erquicke das [Am7]Land, bring uns [D]deinen Segen
[G]Wir dursten nach [C]dir, nach der [G]Quelle des Lebens
[Em]Keiner, der [Am7]sucht, sucht [D]jemals vergebens

[Chorus]
[G]Ströme lebendigen [C]Wassers, fliess [G]aus uns heraus [D]
[G]Erfülle mit [C]Kraft heute [Em]dieses [D]Haus
[C]Komm und [G]erfrische uns, [D]Heiliger Geist
[C]Wir beten dich [D]an und [G]erheben dich

[Verse 2]
[G]Heile das [C]Zerbrochene, [G]binde Wunden auf
[Em]Nimm alle [Am7]Lasten und [D]Sorgen im Lauf
[G]Erneure dein [C]Volk, lass die [G]Feuer entfachen
[Em]Die uns bereit [Am7]für dein [D]Königreich machen`
  },
  {
    id: "uesi-froeid",
    title: "Üsi Fröid",
    author: "Eden Music",
    key: "D",
    bpm: 115,
    theme: "Freude / Lobpreis",
    language: "de-ch",
    youtube: "https://www.youtube.com/results?search_query=Eden+Music+%C3%BCsi+fr%C3%B6id",
    chords: `[Verse 1]
[D]Üsi Fröid chunt [G]vo dir, Herr
[Bm]Du machsch üses [A]Härz so lycht
[D]Nümm cha üs [G]dini Liebi näh
[Bm]Dini Gnad het [A]alles erreycht

[Chorus]
[D]Mir singe, mir [G]juchze, mir tanze vor dir
[Bm]Dankbarkeit [A]füllt üses Härz
[D]Du bisch üsi [G]Fröid und üsi Chraft
[Bm]Dini Liebi [A]verjagt dr Schmärz

[Verse 2]
[D]Mit dr Harfe [G]und dr Trummele
[Bm]Mache mir [A]Lärm für di
[D]E neue Tag [G]faht ah mit dir
[Bm]I dr Freiheit [A]blibe mir`
  },
  {
    id: "vessel",
    title: "Vessel",
    author: "Christa Bucherer",
    key: "E",
    bpm: 74,
    theme: "Hingabe / Dienst",
    language: "en",
    youtube: "https://www.youtube.com/results?search_query=Christa+Bucherer+Vessel",
    chords: `[Verse 1]
[E]Take my life, a [A]vessel in Your hand
[C#m]Mold me, shape me [B]according to Your plan
[E]In Your presence [A]I surrender all
[C#m]Ready to follow [B]whenever You call

[Chorus]
[E]Make me a [A]vessel of Your love
[C#m]Pouring out [B]grace from above
[E]To bring Your light [A]into the dark
[C#m]Ignite a fire, [B]a holy spark

[Verse 2]
[E]Fill my cup, until [A]it overflows
[C#m]Let Your beauty be [B]what my life shows
[E]A broken vessel, [A]healed by Your touch
[C#m]Who loves You, Savior, [B]so very much`
  },
  {
    id: "wuerdig-bisch-nur-du",
    title: "Würdig bisch nur du",
    author: "Columbus",
    key: "G",
    bpm: 70,
    theme: "Anbetung / Würdigkeit",
    language: "de-ch",
    youtube: "https://www.youtube.com/results?search_query=Columbus+W%C3%BCrdig+bisch+nur+du",
    chords: `[Verse 1]
[G]Würdig bisch [C]nur du, oh [D]Herr
[Em]Dini Schöpfig [C]bätet di [D]an
[G]Mit allem wo i [C]bi und [D]ha
[Em]Will i dir [C]mini Ehr [D]erwiise

[Chorus]
[G]Würdig bisch [C]du, Lamm [D]Gottes
[Em]Würdig zu [C]empfah dr [D]Priis
[G]Sieg und [C]Ehr ghöre [D]nur dir
[Em]Du regiersch in [C]diner [D]Macht

[Verse 2]
[G]Halleluja [C]am König [D]vo dr Wält
[Em]Halleluja, [C]dis Volk singt [D]luut
[G]Du hesch dr Tod [C]und d'Angscht be[D]siegt
[Em]Dis Lob wird [C]nie ver[D]gah`
  },
  {
    id: "yaweh",
    title: "Yaweh",
    author: "Elevation Worship (Mock)",
    key: "G",
    bpm: 76,
    theme: "Worship / Praise",
    language: "de-ch",
    youtube: "https://www.youtube.com/results?search_query=Elevation+Worship+Yahweh",
    chords: `[Verse 1]
[G]Heilig, heilig [C]bisch du Herr
[Em]Alli Ehr ghört [D]dir allei
[G]Dini Gnad isch [C]grösser als dr Tod
[Em]Halle[D]luja

[Chorus]
[G]Yaweh, [C]Yaweh
[Em]Mir rüefe di Name [D]ah, oh Herr
[G]Yaweh, [C]Yaweh
[Em]Dini Herrlichkeit [D]erfüllt dr Ruum`
  },
  {
    id: "hungry",
    title: "Hungry",
    author: "Kathryn Scott / Vineyard",
    key: "C",
    bpm: 70,
    theme: "Intimität / Sehnsucht",
    language: "en",
    youtube: "https://www.youtube.com/results?search_query=Kathryn+Scott+Hungry+Vineyard",
    chords: `[Verse 1]
[C]Hungry, I [Am7]come to You
For I [F]know You sa[G]tisfy
[C]I am empty, [Am]but I know
Your [F]love does not [G]run dry

[Pre-Chorus]
[G]So I wait [F]for You, [G]so I wait [F]for You

[Chorus]
I'm [C]falling on my [F]knees
Of[C]fering all [F]of me
[C]Jesus, You're [F]all I [G]want
To [C]fill me`
  },
  {
    id: "hallelujah-your-love-is-amazing",
    title: "Hallelujah / your love is amazing",
    author: "Brenton Brown / Vineyard",
    key: "G",
    bpm: 98,
    theme: "Freudiger Lobpreis",
    language: "en",
    youtube: "https://www.youtube.com/results?search_query=Brenton+Brown+Your+Love+Is+Amazing",
    chords: `[Verse 1]
[G]Your love is a[C]mazing, steady and [D]strong
[G]Boundless and [C]gracious, it's my [D]song
[G]Your love is a[C]mazing, steady and [D]strong
[G]Boundless and [C]gracious, it's my [D]song

[Chorus]
[G]Hallelujah, [C]hallelujah
[Em]Hallelujah, Your [D]love is amazing
[G]Hallelujah, [C]hallelujah
[Em]Hallelujah, Your [D]love is amazing`
  },
  {
    id: "hie-singt-es-haerz",
    title: "Hie singt es Härz",
    author: "Vineyard Bern (Mock)",
    key: "D",
    bpm: 72,
    theme: "Intimacy / Worship",
    language: "de-ch",
    youtube: "https://www.youtube.com/results?search_query=Hie+singt+es+H%C3%A4rz",
    chords: `[Verse 1]
[D]Hie vor dir, [A]in dr Stilli
[Bm]Finde i mis [G]Härz bi dir
[D]Jedes Wort vo [A]diner Liebi
[Bm]Brännt wie e [G]Flämme in mir

[Chorus]
[D]Hie singt es Härz, [A]wo di liebt
[Bm]Hie beuge i mi [G]vor dir, König
[D]Dini Gägewart [A]erfrischt mi neu
[Bm]Du bisch so [G]guet`
  },
  {
    id: "du-allei-bisch-gott",
    title: "Du allei bisch Gott",
    author: "Swiss Worship (Mock)",
    key: "E",
    bpm: 78,
    theme: "Anbetung / Majestät",
    language: "de-ch",
    youtube: "https://www.youtube.com/results?search_query=Du+allei+bisch+Gott",
    chords: `[Verse 1]
[E]Dini Macht isch [A]unendlich, Herr
[C#m]Alli Sterne am [B]Himmel singe dir
[E]Keine isch wie [A]du, so gross
[C#m]Mir bäte [B]di a

[Chorus]
[E]Du allei bisch [A]Gott, Herr
[C#m]Dir ghört mis [B]Läbe ganz allei
[E]König vo dr [A]Herrlichkeit, Retter
[C#m]Du bisch mis [B]Liecht`
  },
  {
    id: "everlasting-god",
    title: "Everlasting God",
    author: "Brenton Brown",
    key: "B",
    bpm: 110,
    theme: "Upbeat Lobpreis / Kraft",
    language: "en",
    youtube: "https://www.youtube.com/results?search_query=Brenton+Brown+Everlasting+God",
    chords: `[Verse 1]
[B]Strength will rise as we [B]wait upon the [E]Lord
We will [B]wait upon the [B]Lord, we will [E]wait upon the Lord
[B]Strength will rise as we [B]wait upon the [E]Lord
We will [B]wait upon the [B]Lord, we will [E]wait upon the Lord

[Pre-Chorus]
Our [B]God, You [E]reign for[B]ever [F#]
Our [B]Hope, You [E]are our [B]Strong De[F#]deliverer

[Chorus]
[B]You are the everlasting [E]God
The everlasting [G#m]God
You do not faint, You [E]won't grow weary
[B]You're the defender of the [E]weak
You comfort those in [G#m]need
You lift us up on [E]wings like eagles`
  },
  {
    id: "uese-vater",
    title: "Üse Vater",
    author: "Vineyard Bern (Mock)",
    key: "G",
    bpm: 68,
    theme: "Vaterunser / Anbetung",
    language: "de-ch",
    youtube: "https://www.youtube.com/results?search_query=%C3%DCse+Vater+worship",
    chords: `[Verse 1]
[G]Üse Vater [C]im Himmel,
[Em]geheiligt sig [D]dine Name
[G]Dis Rych [C]chiem bald zu uns
[Em]Dine Wille [D]gscheh in uns

[Chorus]
[C]Dine isch dis [G]Rych, Herr
[Em]Und d'Chraft [D]und d'Herrlichkeit
[C]In Ewigkeit, [G]in Ewigkeit
[Em]A[D]men`
  },
  {
    id: "by-dyne-fueess",
    title: "By dyne Füess",
    author: "Swiss Worship (Mock)",
    key: "D",
    bpm: 70,
    theme: "Intimacy / Adoration",
    language: "de-ch",
    youtube: "https://www.youtube.com/results?search_query=By+dyne+F%C3%BCess",
    chords: `[Verse 1]
[D]Hie sitze i [A]by dyne Füess
[Bm]Gspüre dini [G]Gnad, so süess
[D]Alli Sorge [A]la i hinder [Bm]mir [G]
[Em]Hie bin i [A]ganz bi dir

[Chorus]
[D]By dyne Füess, [A]hie isch mini [Bm]Rueh [G]
[D]Dini Gägewart [A]deckt mi [Bm]zue [G]
[Bm]Mis Härz loost [A]uf dis lyyse [G]Wort
[Em]Hie an däm [A]heilige Ort`
  },
  {
    id: "i-believe",
    title: "I believe",
    author: "Phil Wickham (Mock)",
    key: "C",
    bpm: 85,
    theme: "Glaubensbekenntnis",
    language: "en",
    youtube: "https://www.youtube.com/results?search_query=Phil+Wickham+I+Believe",
    chords: `[Verse 1]
[C]I believe in God the [F]Father
[Am]I believe in Christ the [G]Son
[C]I believe in the Holy [F]Spirit
[Am]Three in One, [G]Three in One

[Chorus]
[C]I believe, [F]I believe
[Am]In the power of Your [G]name
[C]I believe, [F]I believe
[Am]You are risen from [G]the grave`
  },
  {
    id: "du-hesch-verheisse-herr",
    title: "Du hesch verheisse, Herr",
    author: "German Worship (Mock)",
    key: "G",
    bpm: 72,
    theme: "Vertrauen / Verheissungen",
    language: "de-ch",
    youtube: "https://www.youtube.com/results?search_query=Du+hesch+verheisse+Herr",
    chords: `[Verse 1]
[G]Du hesch verheisse, [C]Herr, dass du bi uns [G]bisch
[Em]Dass dine Segen [Am]nie und nimmer [D]bricht
[G]Mir stöh auf [C]dine Verheiss[G]ige fest
[Em]Du bisch dr [D]Fels, wo uns nie [G]verlässt

[Chorus]
[C]Mir beuge uns [G]vor dir, oh Fels vo dr [D]Ewigkeit
[Em]Dini Tröii [C]währt bis in d'Un[D]endlichkeit
[C]Du hesch verheisse, [G]und du blibsch [D]treu
[C]Erfülle uns [D]jetzt ganz [G]neu`
  }
];

if (typeof module !== 'undefined') {
  module.exports = SONGS;
}
