(() => {
  // <stdin>
  console.log(`\u8FD9\u91CC\u6CA1\u4EC0\u4E48\u597D\u770B\u7684\u3002`);
  var $o = Object.defineProperty;
  var Ro = (e, t, n) => t in e ? $o(e, t, { enumerable: true, configurable: true, writable: true, value: n }) : e[t] = n;
  var Ts = (e, t, n) => Ro(e, typeof t != "symbol" ? t + "" : t, n);
  var Is = { "Content-Type": "application/json" };
  var Xe = (e) => `${e.replace(/\/?$/, "/")}api/`;
  var yt = (e, t = "") => {
    if (typeof e == "object" && e.errno) throw new TypeError(`${t} failed with ${e.errno}: ${e.errmsg}`);
    return e;
  };
  var Er = ({ serverURL: e, lang: t, paths: n, type: r, signal: s }) => fetch(`${Xe(e)}article?path=${encodeURIComponent(n.join(","))}&type=${encodeURIComponent(r.join(","))}&lang=${t}`, { signal: s }).then((i) => i.json()).then((i) => yt(i, "Get counter").data);
  var zn = ({ serverURL: e, lang: t, path: n, type: r, action: s }) => fetch(`${Xe(e)}article?lang=${t}`, { method: "POST", headers: Is, body: JSON.stringify({ path: n, type: r, action: s }) }).then((i) => i.json()).then((i) => yt(i, "Update counter").data);
  var Ls = ({ serverURL: e, lang: t, path: n, page: r, pageSize: s, sortBy: i, signal: l, token: o }) => {
    const a = {};
    return o && (a.Authorization = `Bearer ${o}`), fetch(`${Xe(e)}comment?path=${encodeURIComponent(n)}&pageSize=${s}&page=${r}&lang=${t}&sortBy=${i}`, { signal: l, headers: a }).then((c) => c.json()).then((c) => yt(c, "Get comment data").data);
  };
  var Ms = ({ serverURL: e, lang: t, token: n, comment: r }) => {
    const s = { "Content-Type": "application/json" };
    return n && (s.Authorization = `Bearer ${n}`), fetch(`${Xe(e)}comment?lang=${t}`, { method: "POST", headers: s, body: JSON.stringify(r) }).then((i) => i.json());
  };
  var Ps = ({ serverURL: e, lang: t, token: n, objectId: r }) => fetch(`${Xe(e)}comment/${r}?lang=${t}`, { method: "DELETE", headers: { Authorization: `Bearer ${n}` } }).then((s) => s.json()).then((s) => yt(s, "Delete comment"));
  var tn = ({ serverURL: e, lang: t, token: n, objectId: r, comment: s }) => fetch(`${Xe(e)}comment/${r}?lang=${t}`, { method: "PUT", headers: { ...Is, Authorization: `Bearer ${n}` }, body: JSON.stringify(s) }).then((i) => i.json()).then((i) => yt(i, "Update comment"));
  var Os = ({ serverURL: e, lang: t, paths: n, signal: r }) => fetch(`${Xe(e)}comment?type=count&url=${encodeURIComponent(n.join(","))}&lang=${t}`, { signal: r }).then((s) => s.json()).then((s) => yt(s, "Get comment count").data);
  var js = ({ lang: e, serverURL: t }) => {
    const n = (window.innerWidth - 450) / 2, r = (window.innerHeight - 450) / 2, s = window.open(`${t.replace(/\/$/, "")}/ui/login?lng=${encodeURIComponent(e)}`, "_blank", `width=450,height=450,left=${n},top=${r},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`);
    return s == null || s.postMessage({ type: "TOKEN", data: null }, "*"), new Promise((i) => {
      const l = ({ data: o }) => {
        !o || typeof o != "object" || o.type !== "userInfo" || o.data.token && (s == null || s.close(), window.removeEventListener("message", l), i(o.data));
      };
      window.addEventListener("message", l);
    });
  };
  var zs = ({ serverURL: e, lang: t, paths: n, signal: r }) => Er({ serverURL: e, lang: t, paths: n, type: ["time"], signal: r });
  var Ds = (e) => zn({ ...e, type: "time", action: "inc" });
  var Fs = ({ serverURL: e, lang: t, count: n, signal: r, token: s }) => {
    const i = {};
    return s && (i.Authorization = `Bearer ${s}`), fetch(`${Xe(e)}comment?type=recent&count=${n}&lang=${t}`, { signal: r, headers: i }).then((l) => l.json());
  };
  var Hs = ({ serverURL: e, signal: t, pageSize: n, lang: r }) => fetch(`${Xe(e)}user?pageSize=${n}&lang=${r}`, { signal: t }).then((s) => s.json()).then((s) => yt(s, "user list")).then((s) => s.data);
  var Ao = ["nick", "mail", "link"];
  var Us = (e) => e.filter((t) => Ao.includes(t));
  var Ns = ["//unpkg.com/@waline/emojis@1.1.0/weibo"];
  var Eo = ["//unpkg.com/@waline/emojis/tieba/tieba_agree.png", "//unpkg.com/@waline/emojis/tieba/tieba_look_down.png", "//unpkg.com/@waline/emojis/tieba/tieba_sunglasses.png", "//unpkg.com/@waline/emojis/tieba/tieba_pick_nose.png", "//unpkg.com/@waline/emojis/tieba/tieba_awkward.png", "//unpkg.com/@waline/emojis/tieba/tieba_sleep.png"];
  var To = (e) => new Promise((t, n) => {
    if (e.size > 128e3) return n(new Error("File too large! File size limit 128KB"));
    const r = new FileReader();
    r.readAsDataURL(e), r.onload = () => t(r.result), r.onerror = n;
  });
  var Io = (e) => e ? '<p class="wl-tex">TeX is not available in preview</p>' : '<span class="wl-tex">TeX is not available in preview</span>';
  var Lo = (e) => {
    const t = async (n, r = {}) => fetch(`https://api.giphy.com/v1/gifs/${n}?${new URLSearchParams({ lang: e, limit: "20", rating: "g", api_key: "6CIMLkNMMOhRcXPoMCPkFy4Ybk2XUiMp", ...r }).toString()}`).then((s) => s.json()).then(({ data: s }) => s.map((i) => ({ title: i.title, src: i.images.downsized_medium.url })));
    return { search: (n) => t("search", { q: n, offset: "0" }), default: () => t("trending", {}), more: (n, r = 0) => t("search", { q: n, offset: r.toString() }) };
  };
  var Mo = /[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|\w+/;
  var Po = /</;
  var Oo = /(?:^|\s)\/\/(.+?)$/gm;
  var jo = /\/\*([\S\s]*?)\*\//gm;
  var zo = new RegExp(`(${Mo.source}|${Po.source})|((?:${Oo.source})|(?:${jo.source}))`, "gmi");
  var Bs = ["23AC69", "91C132", "F19726", "E8552D", "1AAB8E", "E1147F", "2980C1", "1BA1E6", "9FA0A0", "F19726", "E30B20", "E30B20", "A3338B"];
  var Tr = {};
  var Do = (e) => {
    let t = 0;
    return e.replace(zo, (n, r, s) => {
      if (s) return `<span style="color: slategray">${s}</span>`;
      if (r === "<") return "&lt;";
      let i;
      Tr[r] ? i = Tr[r] : (i = Bs[t], Tr[r] = i);
      const l = `<span style="color: #${i}">${r}</span>`;
      return t = ++t % Bs.length, l;
    });
  };
  var Fo = ["nick", "nickError", "mail", "mailError", "link", "optional", "placeholder", "sofa", "submit", "like", "cancelLike", "reply", "cancelReply", "comment", "refresh", "more", "preview", "emoji", "uploadImage", "seconds", "minutes", "hours", "days", "now", "uploading", "login", "logout", "admin", "sticky", "word", "wordHint", "anonymous", "level0", "level1", "level2", "level3", "level4", "level5", "gif", "gifSearchPlaceholder", "profile", "approved", "waiting", "spam", "unsticky", "oldest", "latest", "hottest", "reactionTitle"];
  var qe = (e) => Object.fromEntries(e.map((t, n) => [Fo[n], t]));
  var Ho = qe(["Benutzername", "Der Benutzername darf nicht weniger als 3 Bytes umfassen.", "E-Mail", "Bitte best\xE4tigen Sie Ihre E-Mail-Adresse.", "Webseite", "Optional", "Kommentieren Sie hier...", "Noch keine Kommentare.", "Senden", "Gef\xE4llt mir", "Gef\xE4llt mir nicht mehr", "Antworten", "Antwort abbrechen", "Kommentare", "Aktualisieren", "Mehr laden...", "Vorschau", "Emoji", "Ein Bild hochladen", "Vor einigen Sekunden", "Vor einigen Minuten", "Vor einigen Stunden", "Vor einigen Tagen", "Gerade eben", "Hochladen l\xE4uft", "Anmelden", "Abmelden", "Admin", "Angeheftet", "W\xF6rter", "Bitte geben Sie Kommentare zwischen $0 und $1 W\xF6rtern ein! Aktuelle Anzahl der W\xF6rter: $2", "Anonym", "Zwerge", "Hobbits", "Ents", "Magier", "Elfen", "Ma\xEFar", "GIF", "Nach einem GIF suchen", "Profil", "Genehmigt", "Ausstehend", "Spam", "L\xF6sen", "\xC4lteste", "Neueste", "Am beliebtesten", "Was denken Sie?"]);
  var Vs = qe(["NickName", "NickName cannot be less than 3 bytes.", "E-Mail", "Please confirm your email address.", "Website", "Optional", "Comment here...", "No comment yet.", "Submit", "Like", "Cancel like", "Reply", "Cancel reply", "Comments", "Refresh", "Load More...", "Preview", "Emoji", "Upload Image", "seconds ago", "minutes ago", "hours ago", "days ago", "just now", "Uploading", "Login", "logout", "Admin", "Sticky", "Words", `Please input comments between $0 and $1 words! Current word number: $2`, "Anonymous", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Search GIF", "Profile", "Approved", "Waiting", "Spam", "Unsticky", "Oldest", "Latest", "Hottest", "What do you think?"]);
  var Ws = qe(["Nombre de usuario", "El nombre de usuario no puede tener menos de 3 bytes.", "Correo electr\xF3nico", "Por favor confirma tu direcci\xF3n de correo electr\xF3nico.", "Sitio web", "Opcional", "Comenta aqu\xED...", "Sin comentarios todav\xEDa.", "Enviar", "Like", "Anular like", "Responder", "Anular respuesta", "Comentarios", "Recargar", "Cargar M\xE1s...", "Previsualizar", "Emoji", "Subir Imagen", "segundos atr\xE1s", "minutos atr\xE1s", "horas atr\xE1s", "d\xEDas atr\xE1s", "justo ahora", "Subiendo", "Iniciar sesi\xF3n", "cerrar sesi\xF3n", "Admin", "Fijado", "Palabras", `Por favor escriba entre $0 y $1 palabras! El n\xFAmero actual de palabras: $2`, "An\xF3nimo", "Enanos", "Hobbits", "Ents", "Magos", "Elfos", "Maiar", "GIF", "Buscar GIF", "Perfil", "Aprobado", "Esperando", "Spam", "Desfijar", "M\xE1s antiguos", "M\xE1s recientes", "M\xE1s vistos", "\xBFQu\xE9 piensas?"]);
  var qs = qe(["Pseudo", "Le pseudo ne peut pas faire moins de 3 octets.", "E-mail", "Veuillez confirmer votre adresse e-mail.", "Site Web", "Optionnel", "Commentez ici...", "Aucun commentaire pour l'instant.", "Envoyer", "J'aime", "Annuler le j'aime", "R\xE9pondre", "Annuler la r\xE9ponse", "Commentaires", "Actualiser", "Charger plus...", "Aper\xE7u", "Emoji", "T\xE9l\xE9charger une image", "Il y a quelques secondes", "Il y a quelques minutes", "Il y a quelques heures", "Il y a quelques jours", "\xC0 l'instant", "T\xE9l\xE9chargement en cours", "Connexion", "D\xE9connexion", "Admin", "\xC9pingl\xE9", "Mots", `Veuillez saisir des commentaires entre $0 et $1 mots ! Nombre actuel de mots : $2`, "Anonyme", "Nains", "Hobbits", "Ents", "Mages", "Elfes", "Ma\xEFar", "GIF", "Rechercher un GIF", "Profil", "Approuv\xE9", "En attente", "Ind\xE9sirable", "D\xE9tacher", "Le plus ancien", "Dernier", "Le plus populaire", "Qu'en pensez-vous ?"]);
  var Ks = qe(["\u30CB\u30C3\u30AF\u30CD\u30FC\u30E0", "3\u30D0\u30A4\u30C8\u4EE5\u4E0A\u306E\u30CB\u30C3\u30AF\u30CD\u30FC\u30E0\u3092\u3054\u5165\u529B\u304F\u3060\u3055\u3044.", "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9", "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3092\u3054\u78BA\u8A8D\u304F\u3060\u3055\u3044.", "\u30B5\u30A4\u30C8", "\u30AA\u30D7\u30B7\u30E7\u30F3", "\u3053\u3053\u306B\u30B3\u30E1\u30F3\u30C8", "\u30B3\u30E1\u30F3\u30C8\u3057\u307E\u3057\u3087\u3046~", "\u63D0\u51FA\u3059\u308B", "Like", "Cancel like", "\u8FD4\u4FE1\u3059\u308B", "\u30AD\u30E3\u30F3\u30BB\u30EB", "\u30B3\u30E1\u30F3\u30C8", "\u66F4\u65B0", "\u3055\u3089\u306B\u8AAD\u307F\u8FBC\u3080", "\u30D7\u30EC\u30D3\u30E5\u30FC", "\u7D75\u6587\u5B57", "\u753B\u50CF\u3092\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9", "\u79D2\u524D", "\u5206\u524D", "\u6642\u9593\u524D", "\u65E5\u524D", "\u305F\u3063\u3060\u4ECA", "\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9", "\u30ED\u30B0\u30A4\u30F3\u3059\u308B", "\u30ED\u30B0\u30A2\u30A6\u30C8", "\u7BA1\u7406\u8005", "\u30C8\u30C3\u30D7\u306B\u7F6E\u304F", "\u30EF\u30FC\u30C9", `\u30B3\u30E1\u30F3\u30C8\u306F $0 \u304B\u3089 $1 \u30EF\u30FC\u30C9\u306E\u9593\u3067\u306A\u3051\u308C\u3070\u306A\u308A\u307E\u305B\u3093! \u73FE\u5728\u306E\u5358\u8A9E\u756A\u53F7: $2`, "\u533F\u540D", "\u3046\u3048\u306B\u3093", "\u306A\u304B\u306B\u3093", "\u3057\u3082\u304A\u3057", "\u7279\u306B\u3057\u3082\u304A\u3057", "\u304B\u3052", "\u306A\u306C\u3057", "GIF", "\u63A2\u3059 GIF", "\u500B\u4EBA\u60C5\u5831", "\u627F\u8A8D\u6E08\u307F", "\u5F85\u3063\u3066\u3044\u308B", "\u30B9\u30D1\u30E0", "\u3079\u305F\u3064\u304B\u306A\u3044", "\u9006\u9806", "\u6B63\u9806", "\u4EBA\u6C17\u9806", "\u3069\u3046\u601D\u3044\u307E\u3059\u304B\uFF1F"]);
  var Uo = qe(["Apelido", "Apelido n\xE3o pode ser menor que 3 bytes.", "E-Mail", "Por favor, confirme seu endere\xE7o de e-mail.", "Website", "Opcional", "Comente aqui...", "Nenhum coment\xE1rio, ainda.", "Enviar", "Like", "Cancel like", "Responder", "Cancelar resposta", "Coment\xE1rios", "Refrescar", "Carregar Mais...", "Visualizar", "Emoji", "Enviar Imagem", "segundos atr\xE1s", "minutos atr\xE1s", "horas atr\xE1s", "dias atr\xE1s", "agora mesmo", "Enviando", "Entrar", "Sair", "Admin", "Sticky", "Palavras", `Favor enviar coment\xE1rio com $0 a $1 palavras! N\xFAmero de palavras atuais: $2`, "An\xF4nimo", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Pesquisar GIF", "informa\xE7\xE3o pessoal", "Aprovado", "Espera", "Spam", "Unsticky", "Mais velho", "Mais recentes", "Mais quente", "O que voc\xEA acha?"]);
  var Gs = qe(["\u041F\u0441\u0435\u0432\u0434\u043E\u043D\u0438\u043C", "\u041D\u0438\u043A\u043D\u0435\u0439\u043C \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043C\u0435\u043D\u044C\u0448\u0435 3 \u0431\u0430\u0439\u0442.", "\u042D\u043B. \u0430\u0434\u0440\u0435\u0441", "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441 \u0432\u0430\u0448\u0435\u0439 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B.", "\u0412\u0435\u0431-\u0441\u0430\u0439\u0442", "\u041D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439", "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u0437\u0434\u0435\u0441\u044C...", "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0435\u0432.", "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C", "Like", "Cancel like", "\u041E\u0442\u0432\u0435\u0447\u0430\u0442\u044C", "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u043E\u0442\u0432\u0435\u0442", "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438", "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C", "\u0417\u0430\u0433\u0440\u0443\u0437\u0438 \u0431\u043E\u043B\u044C\u0448\u0435...", "\u041F\u0440\u0435\u0432\u044C\u044E", "\u044D\u043C\u043E\u0434\u0437\u0438", "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435", "\u0441\u0435\u043A\u0443\u043D\u0434 \u043D\u0430\u0437\u0430\u0434", "\u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043C\u0438\u043D\u0443\u0442 \u043D\u0430\u0437\u0430\u0434", "\u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0447\u0430\u0441\u043E\u0432 \u043D\u0430\u0437\u0430\u0434", "\u0434\u043D\u0435\u0439 \u043D\u0430\u0437\u0430\u0434", "\u043F\u0440\u044F\u043C\u043E \u0441\u0435\u0439\u0447\u0430\u0441", "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430", "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F", "\u0412\u044B\u0445\u043E\u0434 \u0438\u0437 \u0441\u0438\u0441\u0442\u0435\u043C\u044B", "\u0410\u0434\u043C\u0438\u043D", "\u041B\u0438\u043F\u043A\u0438\u0439", "\u0421\u043B\u043E\u0432\u0430", `\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438 \u043E\u0442 $0 \u0434\u043E $1 \u0441\u043B\u043E\u0432! \u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043A\u0443\u0449\u0435\u0433\u043E \u0441\u043B\u043E\u0432\u0430: $2`, "\u0410\u043D\u043E\u043D\u0438\u043C\u043D\u044B\u0439", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "\u041F\u043E\u0438\u0441\u043A GIF", "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435", "\u041E\u0434\u043E\u0431\u0440\u0435\u043D\u043D\u044B\u0439", "\u041E\u0436\u0438\u0434\u0430\u044E\u0449\u0438\u0439", "\u0421\u043F\u0430\u043C", "\u041D\u0435\u043B\u0438\u043F\u043A\u0438\u0439", "\u0441\u0430\u043C\u044B\u0439 \u0441\u0442\u0430\u0440\u044B\u0439", "\u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439", "\u0441\u0430\u043C\u044B\u0439 \u0433\u043E\u0440\u044F\u0447\u0438\u0439", "\u0427\u0442\u043E \u0432\u044B \u0434\u0443\u043C\u0430\u0435\u0442\u0435?"]);
  var Zs = qe(["T\xEAn", "T\xEAn kh\xF4ng \u0111\u01B0\u1EE3c nh\u1ECF h\u01A1n 3 k\xFD t\u1EF1.", "E-Mail", "Vui l\xF2ng x\xE1c nh\u1EADp \u0111\u1ECBa ch\u1EC9 email c\u1EE7a b\u1EA1n.", "Website", "T\xF9y ch\u1ECDn", "H\xE3y b\xECnh lu\u1EADn c\xF3 v\u0103n ho\xE1!", "Ch\u01B0a c\xF3 b\xECnh lu\u1EADn", "G\u1EEDi", "Th\xEDch", "B\u1ECF th\xEDch", "Tr\u1EA3 l\u1EDDi", "H\u1EE7y b\u1ECF", "b\xECnh lu\u1EADn", "L\xE0m m\u1EDBi", "T\u1EA3i th\xEAm...", "Xem tr\u01B0\u1EDBc", "Emoji", "T\u1EA3i l\xEAn h\xECnh \u1EA3nh", "gi\xE2y tr\u01B0\u1EDBc", "ph\xFAt tr\u01B0\u1EDBc", "gi\u1EDD tr\u01B0\u1EDBc", "ng\xE0y tr\u01B0\u1EDBc", "V\u1EEBa xong", "\u0110ang t\u1EA3i l\xEAn", "\u0110\u0103ng nh\u1EADp", "\u0111\u0103ng xu\u1EA5t", "Qu\u1EA3n tr\u1ECB vi\xEAn", "D\xEDnh", "t\u1EEB", `B\xECnh lu\u1EADn ph\u1EA3i c\xF3 \u0111\u1ED9 d\xE0i gi\u1EEFa $0 v\xE0 $1 t\u1EEB! S\u1ED1 t\u1EEB hi\u1EC7n t\u1EA1i: $2`, "V\xF4 danh", "Ng\u01B0\u1EDDi l\xF9n", "Ng\u01B0\u1EDDi t\xED hon", "Th\u1EA7n r\u1EEBng", "Ph\xE1p s\u01B0", "Ti\xEAn t\u1ED9c", "Maiar", "\u1EA2nh GIF", "T\xECm ki\u1EBFm \u1EA3nh GIF", "th\xF4ng tin c\xE1 nh\xE2n", "\u0110\xE3 \u0111\u01B0\u1EE3c ph\xEA duy\u1EC7t", "\u0110ang ch\u1EDD \u0111\u1EE3i", "Th\u01B0 r\xE1c", "Kh\xF4ng d\xEDnh", "l\xE2u \u0111\u1EDDi nh\u1EA5t", "mu\u1ED9n nh\u1EA5t", "n\xF3ng nh\u1EA5t", "What do you think?"]);
  var Js = qe(["\u6635\u79F0", "\u6635\u79F0\u4E0D\u80FD\u5C11\u4E8E3\u4E2A\u5B57\u7B26", "\u90AE\u7BB1", "\u8BF7\u586B\u5199\u6B63\u786E\u7684\u90AE\u4EF6\u5730\u5740", "\u7F51\u5740", "\u53EF\u9009", "\u6B22\u8FCE\u8BC4\u8BBA", "\u6765\u53D1\u8BC4\u8BBA\u5427~", "\u63D0\u4EA4", "\u559C\u6B22", "\u53D6\u6D88\u559C\u6B22", "\u56DE\u590D", "\u53D6\u6D88\u56DE\u590D", "\u8BC4\u8BBA", "\u5237\u65B0", "\u52A0\u8F7D\u66F4\u591A...", "\u9884\u89C8", "\u8868\u60C5", "\u4E0A\u4F20\u56FE\u7247", "\u79D2\u524D", "\u5206\u949F\u524D", "\u5C0F\u65F6\u524D", "\u5929\u524D", "\u521A\u521A", "\u6B63\u5728\u4E0A\u4F20", "\u767B\u5F55", "\u9000\u51FA", "\u535A\u4E3B", "\u7F6E\u9876", "\u5B57", `\u8BC4\u8BBA\u5B57\u6570\u5E94\u5728 $0 \u5230 $1 \u5B57\u4E4B\u95F4\uFF01 \u5F53\u524D\u5B57\u6570\uFF1A$2`, "\u533F\u540D", "\u6F5C\u6C34", "\u5192\u6CE1", "\u5410\u69FD", "\u6D3B\u8DC3", "\u8BDD\u75E8", "\u4F20\u8BF4", "\u8868\u60C5\u5305", "\u641C\u7D22\u8868\u60C5\u5305", "\u4E2A\u4EBA\u8D44\u6599", "\u901A\u8FC7", "\u5F85\u5BA1\u6838", "\u5783\u573E", "\u53D6\u6D88\u7F6E\u9876", "\u6309\u5012\u5E8F", "\u6309\u6B63\u5E8F", "\u6309\u70ED\u5EA6", "\u4F60\u8BA4\u4E3A\u8FD9\u7BC7\u6587\u7AE0\u600E\u4E48\u6837\uFF1F"]);
  var No = qe(["\u66B1\u7A31", "\u66B1\u7A31\u4E0D\u80FD\u5C11\u65BC3\u500B\u5B57\u5143", "\u90F5\u7BB1", "\u8ACB\u586B\u5BEB\u6B63\u78BA\u7684\u90F5\u4EF6\u5730\u5740", "\u7DB2\u5740", "\u53EF\u9078", "\u6B61\u8FCE\u7559\u8A00", "\u4F86\u767C\u7559\u8A00\u5427~", "\u9001\u51FA", "\u559C\u6B61", "\u53D6\u6D88\u559C\u6B61", "\u56DE\u8986", "\u53D6\u6D88\u56DE\u8986", "\u7559\u8A00", "\u91CD\u6574", "\u8F09\u5165\u66F4\u591A...", "\u9810\u89BD", "\u8868\u60C5", "\u4E0A\u50B3\u5716\u7247", "\u79D2\u524D", "\u5206\u9418\u524D", "\u5C0F\u6642\u524D", "\u5929\u524D", "\u525B\u525B", "\u6B63\u5728\u4E0A\u50B3", "\u767B\u5165", "\u767B\u51FA", "\u7BA1\u7406\u8005", "\u7F6E\u9802", "\u5B57", `\u7559\u8A00\u5B57\u6578\u61C9\u5728 $0 \u5230 $1 \u5B57\u4E4B\u9593\uFF01 \u76EE\u524D\u5B57\u6578\uFF1A$2`, "\u533F\u540D", "\u6F5B\u6C34", "\u5192\u6CE1", "\u5410\u69FD", "\u6D3B\u8E8D", "\u591A\u8A71", "\u50B3\u8AAA", "\u8868\u60C5\u5305", "\u641C\u5C0B\u8868\u60C5\u5305", "\u500B\u4EBA\u8CC7\u6599", "\u901A\u904E", "\u5F85\u5BE9\u6838", "\u5783\u573E", "\u53D6\u6D88\u7F6E\u9802", "\u6700\u65E9", "\u6700\u65B0", "\u71B1\u9580", "\u4F60\u8A8D\u70BA\u9019\u7BC7\u6587\u7AE0\u600E\u9EBC\u6A23\uFF1F"]);
  var Ys = "en-US";
  var Dn = { zh: Js, "zh-cn": Js, "zh-tw": No, en: Vs, "en-us": Vs, fr: qs, "fr-fr": qs, jp: Ks, "jp-jp": Ks, "pt-br": Uo, ru: Gs, "ru-ru": Gs, vi: Zs, "vi-vn": Zs, de: Ho, es: Ws, "es-mx": Ws };
  var Qs = (e) => Dn[e.toLowerCase()] || Dn[Ys.toLowerCase()];
  var Xs = (e) => Object.keys(Dn).includes(e.toLowerCase()) ? e : Ys;
  var ei = { latest: "insertedAt_desc", oldest: "insertedAt_asc", hottest: "like_desc" };
  var Bo = Object.keys(ei);
  var Fn = Symbol("waline-config");
  var ti = (e) => {
    try {
      e = decodeURI(e);
    } catch {
    }
    return e;
  };
  var ni = (e = "") => e.replace(/\/$/u, "");
  var ri = (e) => /^(https?:)?\/\//.test(e);
  var Hn = (e) => {
    const t = ni(e);
    return ri(t) ? t : `https://${t}`;
  };
  var Vo = (e) => Array.isArray(e) ? e : e ? [0, e] : false;
  var nn = (e, t) => e == null || e === true ? t : e === false ? null : e;
  var Wo = ({ serverURL: e, path: t = location.pathname, lang: n = typeof navigator > "u" ? "en-US" : navigator.language, locale: r, meta: s = ["nick", "mail", "link"], requiredMeta: i = [], dark: l = false, pageSize: o = 10, wordLimit: a, noCopyright: c = false, login: u = "enable", recaptchaV3Key: f = "", turnstileKey: d = "", commentSorting: m = "latest", emoji: x = Ns, imageUploader: b, highlighter: T, texRenderer: w, search: C, reaction: N, ...I }) => ({ serverURL: Hn(e), path: ti(t), lang: Xs(n), locale: { ...Qs(Xs(n)), ...typeof r == "object" ? r : {} }, wordLimit: Vo(a), meta: Us(s), requiredMeta: Us(i), dark: l, pageSize: o, commentSorting: m, login: u, noCopyright: c, recaptchaV3Key: f, turnstileKey: d, ...I, reaction: N === true ? Eo : N || null, imageUploader: nn(b, To), highlighter: nn(T, Do), texRenderer: nn(w, Io), emoji: nn(x, Ns), search: nn(C, Lo(n)) });
  var zt = (e) => typeof e == "string";
  var Ir = "{--waline-white:#000;--waline-light-grey:#666;--waline-dark-grey:#999;--waline-color:#888;--waline-bg-color:#1e1e1e;--waline-bg-color-light:#272727;--waline-bg-color-hover: #444;--waline-border-color:#333;--waline-disable-bg-color:#444;--waline-disable-color:#272727;--waline-bq-color:#272727;--waline-info-bg-color:#272727;--waline-info-color:#666}";
  var qo = (e) => zt(e) ? e === "auto" ? `@media(prefers-color-scheme:dark){body${Ir}}` : `${e}${Ir}` : e === true ? `:root${Ir}` : "";
  var Lr = (e, t) => {
    let n = e.toString();
    for (; n.length < t; ) n = "0" + n;
    return n;
  };
  var Ko = (e) => {
    const t = Lr(e.getDate(), 2), n = Lr(e.getMonth() + 1, 2);
    return `${Lr(e.getFullYear(), 2)}-${n}-${t}`;
  };
  var Go = (e, t, n) => {
    if (!e) return "";
    const r = zt(e) ? new Date(e.includes(" ") ? e.replace(/-/g, "/") : e) : e, s = t.getTime() - r.getTime(), i = Math.floor(s / (24 * 3600 * 1e3));
    if (i === 0) {
      const l = s % 864e5, o = Math.floor(l / (3600 * 1e3));
      if (o === 0) {
        const a = l % 36e5, c = Math.floor(a / (60 * 1e3));
        if (c === 0) {
          const u = a % 6e4;
          return `${Math.round(u / 1e3)} ${n.seconds}`;
        }
        return `${c} ${n.minutes}`;
      }
      return `${o} ${n.hours}`;
    }
    return i < 0 ? n.now : i < 8 ? `${i} ${n.days}` : Ko(r);
  };
  var Zo = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  var Jo = (e) => Zo.test(e);
  // @__NO_SIDE_EFFECTS__
  function Mr(e) {
    const t = /* @__PURE__ */ Object.create(null);
    for (const n of e.split(",")) t[n] = 1;
    return (n) => n in t;
  }
  var ie = {};
  var Dt = [];
  var wt = () => {
  };
  var Yo = () => false;
  var Un = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97);
  var Pr = (e) => e.startsWith("onUpdate:");
  var je = Object.assign;
  var si = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  };
  var Qo = Object.prototype.hasOwnProperty;
  var X = (e, t) => Qo.call(e, t);
  var q = Array.isArray;
  var Ft = (e) => rn(e) === "[object Map]";
  var Ht = (e) => rn(e) === "[object Set]";
  var ii = (e) => rn(e) === "[object Date]";
  var ee = (e) => typeof e == "function";
  var ye = (e) => typeof e == "string";
  var Ke = (e) => typeof e == "symbol";
  var he = (e) => e !== null && typeof e == "object";
  var li = (e) => (he(e) || ee(e)) && ee(e.then) && ee(e.catch);
  var oi = Object.prototype.toString;
  var rn = (e) => oi.call(e);
  var Xo = (e) => rn(e).slice(8, -1);
  var ai = (e) => rn(e) === "[object Object]";
  var Or = (e) => ye(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e;
  var sn = /* @__PURE__ */ Mr(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
  var Nn = (e) => {
    const t = /* @__PURE__ */ Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  };
  var ea = /-(\w)/g;
  var ze = Nn((e) => e.replace(ea, (t, n) => n ? n.toUpperCase() : ""));
  var ta = /\B([A-Z])/g;
  var kt = Nn((e) => e.replace(ta, "-$1").toLowerCase());
  var Bn = Nn((e) => e.charAt(0).toUpperCase() + e.slice(1));
  var jr = Nn((e) => e ? `on${Bn(e)}` : "");
  var ft = (e, t) => !Object.is(e, t);
  var Vn = (e, ...t) => {
    for (let n = 0; n < e.length; n++) e[n](...t);
  };
  var ci = (e, t, n, r = false) => {
    Object.defineProperty(e, t, { configurable: true, enumerable: false, writable: r, value: n });
  };
  var Wn = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
  var ui;
  var ln = () => ui || (ui = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
  function on(e) {
    if (q(e)) {
      const t = {};
      for (let n = 0; n < e.length; n++) {
        const r = e[n], s = ye(r) ? ia(r) : on(r);
        if (s) for (const i in s) t[i] = s[i];
      }
      return t;
    } else if (ye(e) || he(e)) return e;
  }
  var na = /;(?![^(]*\))/g;
  var ra = /:([^]+)/;
  var sa = /\/\*[^]*?\*\//g;
  function ia(e) {
    const t = {};
    return e.replace(sa, "").split(na).forEach((n) => {
      if (n) {
        const r = n.split(ra);
        r.length > 1 && (t[r[0].trim()] = r[1].trim());
      }
    }), t;
  }
  function me(e) {
    let t = "";
    if (ye(e)) t = e;
    else if (q(e)) for (let n = 0; n < e.length; n++) {
      const r = me(e[n]);
      r && (t += r + " ");
    }
    else if (he(e)) for (const n in e) e[n] && (t += n + " ");
    return t.trim();
  }
  var la = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
  var oa = /* @__PURE__ */ Mr(la);
  function fi(e) {
    return !!e || e === "";
  }
  function aa(e, t) {
    if (e.length !== t.length) return false;
    let n = true;
    for (let r = 0; n && r < e.length; r++) n = xt(e[r], t[r]);
    return n;
  }
  function xt(e, t) {
    if (e === t) return true;
    let n = ii(e), r = ii(t);
    if (n || r) return n && r ? e.getTime() === t.getTime() : false;
    if (n = Ke(e), r = Ke(t), n || r) return e === t;
    if (n = q(e), r = q(t), n || r) return n && r ? aa(e, t) : false;
    if (n = he(e), r = he(t), n || r) {
      if (!n || !r) return false;
      const s = Object.keys(e).length, i = Object.keys(t).length;
      if (s !== i) return false;
      for (const l in e) {
        const o = e.hasOwnProperty(l), a = t.hasOwnProperty(l);
        if (o && !a || !o && a || !xt(e[l], t[l])) return false;
      }
    }
    return String(e) === String(t);
  }
  function zr(e, t) {
    return e.findIndex((n) => xt(n, t));
  }
  var hi = (e) => !!(e && e.__v_isRef === true);
  var Y = (e) => ye(e) ? e : e == null ? "" : q(e) || he(e) && (e.toString === oi || !ee(e.toString)) ? hi(e) ? Y(e.value) : JSON.stringify(e, pi, 2) : String(e);
  var pi = (e, t) => hi(t) ? pi(e, t.value) : Ft(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((n, [r, s], i) => (n[Dr(r, i) + " =>"] = s, n), {}) } : Ht(t) ? { [`Set(${t.size})`]: [...t.values()].map((n) => Dr(n)) } : Ke(t) ? Dr(t) : he(t) && !q(t) && !ai(t) ? String(t) : t;
  var Dr = (e, t = "") => {
    var n;
    return Ke(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
  };
  var Ce;
  var ca = class {
    constructor(t = false) {
      this.detached = t, this._active = true, this.effects = [], this.cleanups = [], this._isPaused = false, this.parent = Ce, !t && Ce && (this.index = (Ce.scopes || (Ce.scopes = [])).push(this) - 1);
    }
    get active() {
      return this._active;
    }
    pause() {
      if (this._active) {
        this._isPaused = true;
        let t, n;
        if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause();
        for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause();
      }
    }
    resume() {
      if (this._active && this._isPaused) {
        this._isPaused = false;
        let t, n;
        if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume();
        for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume();
      }
    }
    run(t) {
      if (this._active) {
        const n = Ce;
        try {
          return Ce = this, t();
        } finally {
          Ce = n;
        }
      }
    }
    on() {
      Ce = this;
    }
    off() {
      Ce = this.parent;
    }
    stop(t) {
      if (this._active) {
        this._active = false;
        let n, r;
        for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
        for (this.effects.length = 0, n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
        if (this.cleanups.length = 0, this.scopes) {
          for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(true);
          this.scopes.length = 0;
        }
        if (!this.detached && this.parent && !t) {
          const s = this.parent.scopes.pop();
          s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index);
        }
        this.parent = void 0;
      }
    }
  };
  function di() {
    return Ce;
  }
  function ua(e, t = false) {
    Ce && Ce.cleanups.push(e);
  }
  var ue;
  var Fr = /* @__PURE__ */ new WeakSet();
  var gi = class {
    constructor(t) {
      this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ce && Ce.active && Ce.effects.push(this);
    }
    pause() {
      this.flags |= 64;
    }
    resume() {
      this.flags & 64 && (this.flags &= -65, Fr.has(this) && (Fr.delete(this), this.trigger()));
    }
    notify() {
      this.flags & 2 && !(this.flags & 32) || this.flags & 8 || vi(this);
    }
    run() {
      if (!(this.flags & 1)) return this.fn();
      this.flags |= 2, xi(this), bi(this);
      const t = ue, n = Ne;
      ue = this, Ne = true;
      try {
        return this.fn();
      } finally {
        yi(this), ue = t, Ne = n, this.flags &= -3;
      }
    }
    stop() {
      if (this.flags & 1) {
        for (let t = this.deps; t; t = t.nextDep) Br(t);
        this.deps = this.depsTail = void 0, xi(this), this.onStop && this.onStop(), this.flags &= -2;
      }
    }
    trigger() {
      this.flags & 64 ? Fr.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
    }
    runIfDirty() {
      Nr(this) && this.run();
    }
    get dirty() {
      return Nr(this);
    }
  };
  var mi = 0;
  var an;
  var cn;
  function vi(e, t = false) {
    if (e.flags |= 8, t) {
      e.next = cn, cn = e;
      return;
    }
    e.next = an, an = e;
  }
  function Hr() {
    mi++;
  }
  function Ur() {
    if (--mi > 0) return;
    if (cn) {
      let t = cn;
      for (cn = void 0; t; ) {
        const n = t.next;
        t.next = void 0, t.flags &= -9, t = n;
      }
    }
    let e;
    for (; an; ) {
      let t = an;
      for (an = void 0; t; ) {
        const n = t.next;
        if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
          t.trigger();
        } catch (r) {
          e || (e = r);
        }
        t = n;
      }
    }
    if (e) throw e;
  }
  function bi(e) {
    for (let t = e.deps; t; t = t.nextDep) t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
  }
  function yi(e) {
    let t, n = e.depsTail, r = n;
    for (; r; ) {
      const s = r.prevDep;
      r.version === -1 ? (r === n && (n = s), Br(r), fa(r)) : t = r, r.dep.activeLink = r.prevActiveLink, r.prevActiveLink = void 0, r = s;
    }
    e.deps = t, e.depsTail = n;
  }
  function Nr(e) {
    for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (wi(t.dep.computed) || t.dep.version !== t.version)) return true;
    return !!e._dirty;
  }
  function wi(e) {
    if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === un)) return;
    e.globalVersion = un;
    const t = e.dep;
    if (e.flags |= 2, t.version > 0 && !e.isSSR && e.deps && !Nr(e)) {
      e.flags &= -3;
      return;
    }
    const n = ue, r = Ne;
    ue = e, Ne = true;
    try {
      bi(e);
      const s = e.fn(e._value);
      (t.version === 0 || ft(s, e._value)) && (e._value = s, t.version++);
    } catch (s) {
      throw t.version++, s;
    } finally {
      ue = n, Ne = r, yi(e), e.flags &= -3;
    }
  }
  function Br(e, t = false) {
    const { dep: n, prevSub: r, nextSub: s } = e;
    if (r && (r.nextSub = s, e.prevSub = void 0), s && (s.prevSub = r, e.nextSub = void 0), n.subs === e && (n.subs = r, !r && n.computed)) {
      n.computed.flags &= -5;
      for (let i = n.computed.deps; i; i = i.nextDep) Br(i, true);
    }
    !t && !--n.sc && n.map && n.map.delete(n.key);
  }
  function fa(e) {
    const { prevDep: t, nextDep: n } = e;
    t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
  }
  var Ne = true;
  var ki = [];
  function _t() {
    ki.push(Ne), Ne = false;
  }
  function Ct() {
    const e = ki.pop();
    Ne = e === void 0 ? true : e;
  }
  function xi(e) {
    const { cleanup: t } = e;
    if (e.cleanup = void 0, t) {
      const n = ue;
      ue = void 0;
      try {
        t();
      } finally {
        ue = n;
      }
    }
  }
  var un = 0;
  var ha = class {
    constructor(t, n) {
      this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
    }
  };
  var qn = class {
    constructor(t) {
      this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0;
    }
    track(t) {
      if (!ue || !Ne || ue === this.computed) return;
      let n = this.activeLink;
      if (n === void 0 || n.sub !== ue) n = this.activeLink = new ha(ue, this), ue.deps ? (n.prevDep = ue.depsTail, ue.depsTail.nextDep = n, ue.depsTail = n) : ue.deps = ue.depsTail = n, _i(n);
      else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
        const r = n.nextDep;
        r.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = r), n.prevDep = ue.depsTail, n.nextDep = void 0, ue.depsTail.nextDep = n, ue.depsTail = n, ue.deps === n && (ue.deps = r);
      }
      return n;
    }
    trigger(t) {
      this.version++, un++, this.notify(t);
    }
    notify(t) {
      Hr();
      try {
        for (let n = this.subs; n; n = n.prevSub) n.sub.notify() && n.sub.dep.notify();
      } finally {
        Ur();
      }
    }
  };
  function _i(e) {
    if (e.dep.sc++, e.sub.flags & 4) {
      const t = e.dep.computed;
      if (t && !e.dep.subs) {
        t.flags |= 20;
        for (let r = t.deps; r; r = r.nextDep) _i(r);
      }
      const n = e.dep.subs;
      n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
    }
  }
  var Kn = /* @__PURE__ */ new WeakMap();
  var St = Symbol("");
  var Vr = Symbol("");
  var fn = Symbol("");
  function ke(e, t, n) {
    if (Ne && ue) {
      let r = Kn.get(e);
      r || Kn.set(e, r = /* @__PURE__ */ new Map());
      let s = r.get(n);
      s || (r.set(n, s = new qn()), s.map = r, s.key = n), s.track();
    }
  }
  function et(e, t, n, r, s, i) {
    const l = Kn.get(e);
    if (!l) {
      un++;
      return;
    }
    const o = (a) => {
      a && a.trigger();
    };
    if (Hr(), t === "clear") l.forEach(o);
    else {
      const a = q(e), c = a && Or(n);
      if (a && n === "length") {
        const u = Number(r);
        l.forEach((f, d) => {
          (d === "length" || d === fn || !Ke(d) && d >= u) && o(f);
        });
      } else switch ((n !== void 0 || l.has(void 0)) && o(l.get(n)), c && o(l.get(fn)), t) {
        case "add":
          a ? c && o(l.get("length")) : (o(l.get(St)), Ft(e) && o(l.get(Vr)));
          break;
        case "delete":
          a || (o(l.get(St)), Ft(e) && o(l.get(Vr)));
          break;
        case "set":
          Ft(e) && o(l.get(St));
          break;
      }
    }
    Ur();
  }
  function pa(e, t) {
    const n = Kn.get(e);
    return n && n.get(t);
  }
  function Ut(e) {
    const t = Q(e);
    return t === e ? t : (ke(t, "iterate", fn), De(e) ? t : t.map(xe));
  }
  function Gn(e) {
    return ke(e = Q(e), "iterate", fn), e;
  }
  var da = { __proto__: null, [Symbol.iterator]() {
    return Wr(this, Symbol.iterator, xe);
  }, concat(...e) {
    return Ut(this).concat(...e.map((t) => q(t) ? Ut(t) : t));
  }, entries() {
    return Wr(this, "entries", (e) => (e[1] = xe(e[1]), e));
  }, every(e, t) {
    return tt(this, "every", e, t, void 0, arguments);
  }, filter(e, t) {
    return tt(this, "filter", e, t, (n) => n.map(xe), arguments);
  }, find(e, t) {
    return tt(this, "find", e, t, xe, arguments);
  }, findIndex(e, t) {
    return tt(this, "findIndex", e, t, void 0, arguments);
  }, findLast(e, t) {
    return tt(this, "findLast", e, t, xe, arguments);
  }, findLastIndex(e, t) {
    return tt(this, "findLastIndex", e, t, void 0, arguments);
  }, forEach(e, t) {
    return tt(this, "forEach", e, t, void 0, arguments);
  }, includes(...e) {
    return qr(this, "includes", e);
  }, indexOf(...e) {
    return qr(this, "indexOf", e);
  }, join(e) {
    return Ut(this).join(e);
  }, lastIndexOf(...e) {
    return qr(this, "lastIndexOf", e);
  }, map(e, t) {
    return tt(this, "map", e, t, void 0, arguments);
  }, pop() {
    return hn(this, "pop");
  }, push(...e) {
    return hn(this, "push", e);
  }, reduce(e, ...t) {
    return Ci(this, "reduce", e, t);
  }, reduceRight(e, ...t) {
    return Ci(this, "reduceRight", e, t);
  }, shift() {
    return hn(this, "shift");
  }, some(e, t) {
    return tt(this, "some", e, t, void 0, arguments);
  }, splice(...e) {
    return hn(this, "splice", e);
  }, toReversed() {
    return Ut(this).toReversed();
  }, toSorted(e) {
    return Ut(this).toSorted(e);
  }, toSpliced(...e) {
    return Ut(this).toSpliced(...e);
  }, unshift(...e) {
    return hn(this, "unshift", e);
  }, values() {
    return Wr(this, "values", xe);
  } };
  function Wr(e, t, n) {
    const r = Gn(e), s = r[t]();
    return r !== e && !De(e) && (s._next = s.next, s.next = () => {
      const i = s._next();
      return i.value && (i.value = n(i.value)), i;
    }), s;
  }
  var ga = Array.prototype;
  function tt(e, t, n, r, s, i) {
    const l = Gn(e), o = l !== e && !De(e), a = l[t];
    if (a !== ga[t]) {
      const f = a.apply(e, i);
      return o ? xe(f) : f;
    }
    let c = n;
    l !== e && (o ? c = function(f, d) {
      return n.call(this, xe(f), d, e);
    } : n.length > 2 && (c = function(f, d) {
      return n.call(this, f, d, e);
    }));
    const u = a.call(l, c, r);
    return o && s ? s(u) : u;
  }
  function Ci(e, t, n, r) {
    const s = Gn(e);
    let i = n;
    return s !== e && (De(e) ? n.length > 3 && (i = function(l, o, a) {
      return n.call(this, l, o, a, e);
    }) : i = function(l, o, a) {
      return n.call(this, l, xe(o), a, e);
    }), s[t](i, ...r);
  }
  function qr(e, t, n) {
    const r = Q(e);
    ke(r, "iterate", fn);
    const s = r[t](...n);
    return (s === -1 || s === false) && Gr(n[0]) ? (n[0] = Q(n[0]), r[t](...n)) : s;
  }
  function hn(e, t, n = []) {
    _t(), Hr();
    const r = Q(e)[t].apply(e, n);
    return Ur(), Ct(), r;
  }
  var ma = /* @__PURE__ */ Mr("__proto__,__v_isRef,__isVue");
  var Si = new Set(Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ke));
  function va(e) {
    Ke(e) || (e = String(e));
    const t = Q(this);
    return ke(t, "has", e), t.hasOwnProperty(e);
  }
  var $i = class {
    constructor(t = false, n = false) {
      this._isReadonly = t, this._isShallow = n;
    }
    get(t, n, r) {
      if (n === "__v_skip") return t.__v_skip;
      const s = this._isReadonly, i = this._isShallow;
      if (n === "__v_isReactive") return !s;
      if (n === "__v_isReadonly") return s;
      if (n === "__v_isShallow") return i;
      if (n === "__v_raw") return r === (s ? i ? Li : Ii : i ? Ti : Ei).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
      const l = q(t);
      if (!s) {
        let a;
        if (l && (a = da[n])) return a;
        if (n === "hasOwnProperty") return va;
      }
      const o = Reflect.get(t, n, ve(t) ? t : r);
      return (Ke(n) ? Si.has(n) : ma(n)) || (s || ke(t, "get", n), i) ? o : ve(o) ? l && Or(n) ? o : o.value : he(o) ? s ? Nt(o) : pn(o) : o;
    }
  };
  var Ri = class extends $i {
    constructor(t = false) {
      super(false, t);
    }
    set(t, n, r, s) {
      let i = t[n];
      if (!this._isShallow) {
        const a = $t(i);
        if (!De(r) && !$t(r) && (i = Q(i), r = Q(r)), !q(t) && ve(i) && !ve(r)) return a ? false : (i.value = r, true);
      }
      const l = q(t) && Or(n) ? Number(n) < t.length : X(t, n), o = Reflect.set(t, n, r, ve(t) ? t : s);
      return t === Q(s) && (l ? ft(r, i) && et(t, "set", n, r) : et(t, "add", n, r)), o;
    }
    deleteProperty(t, n) {
      const r = X(t, n), s = Reflect.deleteProperty(t, n);
      return s && r && et(t, "delete", n, void 0), s;
    }
    has(t, n) {
      const r = Reflect.has(t, n);
      return (!Ke(n) || !Si.has(n)) && ke(t, "has", n), r;
    }
    ownKeys(t) {
      return ke(t, "iterate", q(t) ? "length" : St), Reflect.ownKeys(t);
    }
  };
  var Ai = class extends $i {
    constructor(t = false) {
      super(true, t);
    }
    set(t, n) {
      return true;
    }
    deleteProperty(t, n) {
      return true;
    }
  };
  var ba = new Ri();
  var ya = new Ai();
  var wa = new Ri(true);
  var ka = new Ai(true);
  var Kr = (e) => e;
  var Zn = (e) => Reflect.getPrototypeOf(e);
  function xa(e, t, n) {
    return function(...r) {
      const s = this.__v_raw, i = Q(s), l = Ft(i), o = e === "entries" || e === Symbol.iterator && l, a = e === "keys" && l, c = s[e](...r), u = n ? Kr : t ? Zr : xe;
      return !t && ke(i, "iterate", a ? Vr : St), { next() {
        const { value: f, done: d } = c.next();
        return d ? { value: f, done: d } : { value: o ? [u(f[0]), u(f[1])] : u(f), done: d };
      }, [Symbol.iterator]() {
        return this;
      } };
    };
  }
  function Jn(e) {
    return function(...t) {
      return e === "delete" ? false : e === "clear" ? void 0 : this;
    };
  }
  function _a(e, t) {
    const n = { get(s) {
      const i = this.__v_raw, l = Q(i), o = Q(s);
      e || (ft(s, o) && ke(l, "get", s), ke(l, "get", o));
      const { has: a } = Zn(l), c = t ? Kr : e ? Zr : xe;
      if (a.call(l, s)) return c(i.get(s));
      if (a.call(l, o)) return c(i.get(o));
      i !== l && i.get(s);
    }, get size() {
      const s = this.__v_raw;
      return !e && ke(Q(s), "iterate", St), Reflect.get(s, "size", s);
    }, has(s) {
      const i = this.__v_raw, l = Q(i), o = Q(s);
      return e || (ft(s, o) && ke(l, "has", s), ke(l, "has", o)), s === o ? i.has(s) : i.has(s) || i.has(o);
    }, forEach(s, i) {
      const l = this, o = l.__v_raw, a = Q(o), c = t ? Kr : e ? Zr : xe;
      return !e && ke(a, "iterate", St), o.forEach((u, f) => s.call(i, c(u), c(f), l));
    } };
    return je(n, e ? { add: Jn("add"), set: Jn("set"), delete: Jn("delete"), clear: Jn("clear") } : { add(s) {
      !t && !De(s) && !$t(s) && (s = Q(s));
      const i = Q(this);
      return Zn(i).has.call(i, s) || (i.add(s), et(i, "add", s, s)), this;
    }, set(s, i) {
      !t && !De(i) && !$t(i) && (i = Q(i));
      const l = Q(this), { has: o, get: a } = Zn(l);
      let c = o.call(l, s);
      c || (s = Q(s), c = o.call(l, s));
      const u = a.call(l, s);
      return l.set(s, i), c ? ft(i, u) && et(l, "set", s, i) : et(l, "add", s, i), this;
    }, delete(s) {
      const i = Q(this), { has: l, get: o } = Zn(i);
      let a = l.call(i, s);
      a || (s = Q(s), a = l.call(i, s)), o && o.call(i, s);
      const c = i.delete(s);
      return a && et(i, "delete", s, void 0), c;
    }, clear() {
      const s = Q(this), i = s.size !== 0, l = s.clear();
      return i && et(s, "clear", void 0, void 0), l;
    } }), ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
      n[s] = xa(s, e, t);
    }), n;
  }
  function Yn(e, t) {
    const n = _a(e, t);
    return (r, s, i) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? r : Reflect.get(X(n, s) && s in r ? n : r, s, i);
  }
  var Ca = { get: Yn(false, false) };
  var Sa = { get: Yn(false, true) };
  var $a = { get: Yn(true, false) };
  var Ra = { get: Yn(true, true) };
  var Ei = /* @__PURE__ */ new WeakMap();
  var Ti = /* @__PURE__ */ new WeakMap();
  var Ii = /* @__PURE__ */ new WeakMap();
  var Li = /* @__PURE__ */ new WeakMap();
  function Aa(e) {
    switch (e) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function Ea(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : Aa(Xo(e));
  }
  function pn(e) {
    return $t(e) ? e : Qn(e, false, ba, Ca, Ei);
  }
  function Ta(e) {
    return Qn(e, false, wa, Sa, Ti);
  }
  function Nt(e) {
    return Qn(e, true, ya, $a, Ii);
  }
  function Ia(e) {
    return Qn(e, true, ka, Ra, Li);
  }
  function Qn(e, t, n, r, s) {
    if (!he(e) || e.__v_raw && !(t && e.__v_isReactive)) return e;
    const i = s.get(e);
    if (i) return i;
    const l = Ea(e);
    if (l === 0) return e;
    const o = new Proxy(e, l === 2 ? r : n);
    return s.set(e, o), o;
  }
  function Bt(e) {
    return $t(e) ? Bt(e.__v_raw) : !!(e && e.__v_isReactive);
  }
  function $t(e) {
    return !!(e && e.__v_isReadonly);
  }
  function De(e) {
    return !!(e && e.__v_isShallow);
  }
  function Gr(e) {
    return e ? !!e.__v_raw : false;
  }
  function Q(e) {
    const t = e && e.__v_raw;
    return t ? Q(t) : e;
  }
  function La(e) {
    return !X(e, "__v_skip") && Object.isExtensible(e) && ci(e, "__v_skip", true), e;
  }
  var xe = (e) => he(e) ? pn(e) : e;
  var Zr = (e) => he(e) ? Nt(e) : e;
  function ve(e) {
    return e ? e.__v_isRef === true : false;
  }
  function se(e) {
    return Mi(e, false);
  }
  function Rt(e) {
    return Mi(e, true);
  }
  function Mi(e, t) {
    return ve(e) ? e : new Ma(e, t);
  }
  var Ma = class {
    constructor(t, n) {
      this.dep = new qn(), this.__v_isRef = true, this.__v_isShallow = false, this._rawValue = n ? t : Q(t), this._value = n ? t : xe(t), this.__v_isShallow = n;
    }
    get value() {
      return this.dep.track(), this._value;
    }
    set value(t) {
      const n = this._rawValue, r = this.__v_isShallow || De(t) || $t(t);
      t = r ? t : Q(t), ft(t, n) && (this._rawValue = t, this._value = r ? t : xe(t), this.dep.trigger());
    }
  };
  function K(e) {
    return ve(e) ? e.value : e;
  }
  function Te(e) {
    return ee(e) ? e() : K(e);
  }
  var Pa = { get: (e, t, n) => t === "__v_raw" ? e : K(Reflect.get(e, t, n)), set: (e, t, n, r) => {
    const s = e[t];
    return ve(s) && !ve(n) ? (s.value = n, true) : Reflect.set(e, t, n, r);
  } };
  function Pi(e) {
    return Bt(e) ? e : new Proxy(e, Pa);
  }
  var Oa = class {
    constructor(t) {
      this.__v_isRef = true, this._value = void 0;
      const n = this.dep = new qn(), { get: r, set: s } = t(n.track.bind(n), n.trigger.bind(n));
      this._get = r, this._set = s;
    }
    get value() {
      return this._value = this._get();
    }
    set value(t) {
      this._set(t);
    }
  };
  function ja(e) {
    return new Oa(e);
  }
  var za = class {
    constructor(t, n, r) {
      this._object = t, this._key = n, this._defaultValue = r, this.__v_isRef = true, this._value = void 0;
    }
    get value() {
      const t = this._object[this._key];
      return this._value = t === void 0 ? this._defaultValue : t;
    }
    set value(t) {
      this._object[this._key] = t;
    }
    get dep() {
      return pa(Q(this._object), this._key);
    }
  };
  var Da = class {
    constructor(t) {
      this._getter = t, this.__v_isRef = true, this.__v_isReadonly = true, this._value = void 0;
    }
    get value() {
      return this._value = this._getter();
    }
  };
  function Fa(e, t, n) {
    return ve(e) ? e : ee(e) ? new Da(e) : he(e) && arguments.length > 1 ? Ha(e, t, n) : se(e);
  }
  function Ha(e, t, n) {
    const r = e[t];
    return ve(r) ? r : new za(e, t, n);
  }
  var Ua = class {
    constructor(t, n, r) {
      this.fn = t, this.setter = n, this._value = void 0, this.dep = new qn(this), this.__v_isRef = true, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = un - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = r;
    }
    notify() {
      if (this.flags |= 16, !(this.flags & 8) && ue !== this) return vi(this, true), true;
    }
    get value() {
      const t = this.dep.track();
      return wi(this), t && (t.version = this.dep.version), this._value;
    }
    set value(t) {
      this.setter && this.setter(t);
    }
  };
  function Na(e, t, n = false) {
    let r, s;
    return ee(e) ? r = e : (r = e.get, s = e.set), new Ua(r, s, n);
  }
  var Xn = {};
  var er = /* @__PURE__ */ new WeakMap();
  var At;
  function Ba(e, t = false, n = At) {
    if (n) {
      let r = er.get(n);
      r || er.set(n, r = []), r.push(e);
    }
  }
  function Va(e, t, n = ie) {
    const { immediate: r, deep: s, once: i, scheduler: l, augmentJob: o, call: a } = n, c = (I) => s ? I : De(I) || s === false || s === 0 ? nt(I, 1) : nt(I);
    let u, f, d, m, x = false, b = false;
    if (ve(e) ? (f = () => e.value, x = De(e)) : Bt(e) ? (f = () => c(e), x = true) : q(e) ? (b = true, x = e.some((I) => Bt(I) || De(I)), f = () => e.map((I) => {
      if (ve(I)) return I.value;
      if (Bt(I)) return c(I);
      if (ee(I)) return a ? a(I, 2) : I();
    })) : ee(e) ? t ? f = a ? () => a(e, 2) : e : f = () => {
      if (d) {
        _t();
        try {
          d();
        } finally {
          Ct();
        }
      }
      const I = At;
      At = u;
      try {
        return a ? a(e, 3, [m]) : e(m);
      } finally {
        At = I;
      }
    } : f = wt, t && s) {
      const I = f, O = s === true ? 1 / 0 : s;
      f = () => nt(I(), O);
    }
    const T = di(), w = () => {
      u.stop(), T && T.active && si(T.effects, u);
    };
    if (i && t) {
      const I = t;
      t = (...O) => {
        I(...O), w();
      };
    }
    let C = b ? new Array(e.length).fill(Xn) : Xn;
    const N = (I) => {
      if (!(!(u.flags & 1) || !u.dirty && !I)) if (t) {
        const O = u.run();
        if (s || x || (b ? O.some((G, j) => ft(G, C[j])) : ft(O, C))) {
          d && d();
          const G = At;
          At = u;
          try {
            const j = [O, C === Xn ? void 0 : b && C[0] === Xn ? [] : C, m];
            a ? a(t, 3, j) : t(...j), C = O;
          } finally {
            At = G;
          }
        }
      } else u.run();
    };
    return o && o(N), u = new gi(f), u.scheduler = l ? () => l(N, false) : N, m = (I) => Ba(I, false, u), d = u.onStop = () => {
      const I = er.get(u);
      if (I) {
        if (a) a(I, 4);
        else for (const O of I) O();
        er.delete(u);
      }
    }, t ? r ? N(true) : C = u.run() : l ? l(N.bind(null, true), true) : u.run(), w.pause = u.pause.bind(u), w.resume = u.resume.bind(u), w.stop = w, w;
  }
  function nt(e, t = 1 / 0, n) {
    if (t <= 0 || !he(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e))) return e;
    if (n.add(e), t--, ve(e)) nt(e.value, t, n);
    else if (q(e)) for (let r = 0; r < e.length; r++) nt(e[r], t, n);
    else if (Ht(e) || Ft(e)) e.forEach((r) => {
      nt(r, t, n);
    });
    else if (ai(e)) {
      for (const r in e) nt(e[r], t, n);
      for (const r of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, r) && nt(e[r], t, n);
    }
    return e;
  }
  function dn(e, t, n, r) {
    try {
      return r ? e(...r) : e();
    } catch (s) {
      tr(s, t, n);
    }
  }
  function rt(e, t, n, r) {
    if (ee(e)) {
      const s = dn(e, t, n, r);
      return s && li(s) && s.catch((i) => {
        tr(i, t, n);
      }), s;
    }
    if (q(e)) {
      const s = [];
      for (let i = 0; i < e.length; i++) s.push(rt(e[i], t, n, r));
      return s;
    }
  }
  function tr(e, t, n, r = true) {
    const s = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: l } = t && t.appContext.config || ie;
    if (t) {
      let o = t.parent;
      const a = t.proxy, c = `https://vuejs.org/error-reference/#runtime-${n}`;
      for (; o; ) {
        const u = o.ec;
        if (u) {
          for (let f = 0; f < u.length; f++) if (u[f](e, a, c) === false) return;
        }
        o = o.parent;
      }
      if (i) {
        _t(), dn(i, null, 10, [e, a, c]), Ct();
        return;
      }
    }
    Wa(e, n, s, r, l);
  }
  function Wa(e, t, n, r = true, s = false) {
    if (s) throw e;
    console.error(e);
  }
  var Se = [];
  var Ge = -1;
  var Vt = [];
  var ht = null;
  var Wt = 0;
  var Oi = Promise.resolve();
  var nr = null;
  function qt(e) {
    const t = nr || Oi;
    return e ? t.then(this ? e.bind(this) : e) : t;
  }
  function qa(e) {
    let t = Ge + 1, n = Se.length;
    for (; t < n; ) {
      const r = t + n >>> 1, s = Se[r], i = gn(s);
      i < e || i === e && s.flags & 2 ? t = r + 1 : n = r;
    }
    return t;
  }
  function Jr(e) {
    if (!(e.flags & 1)) {
      const t = gn(e), n = Se[Se.length - 1];
      !n || !(e.flags & 2) && t >= gn(n) ? Se.push(e) : Se.splice(qa(t), 0, e), e.flags |= 1, ji();
    }
  }
  function ji() {
    nr || (nr = Oi.then(Fi));
  }
  function Ka(e) {
    q(e) ? Vt.push(...e) : ht && e.id === -1 ? ht.splice(Wt + 1, 0, e) : e.flags & 1 || (Vt.push(e), e.flags |= 1), ji();
  }
  function zi(e, t, n = Ge + 1) {
    for (; n < Se.length; n++) {
      const r = Se[n];
      if (r && r.flags & 2) {
        if (e && r.id !== e.uid) continue;
        Se.splice(n, 1), n--, r.flags & 4 && (r.flags &= -2), r(), r.flags & 4 || (r.flags &= -2);
      }
    }
  }
  function Di(e) {
    if (Vt.length) {
      const t = [...new Set(Vt)].sort((n, r) => gn(n) - gn(r));
      if (Vt.length = 0, ht) {
        ht.push(...t);
        return;
      }
      for (ht = t, Wt = 0; Wt < ht.length; Wt++) {
        const n = ht[Wt];
        n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
      }
      ht = null, Wt = 0;
    }
  }
  var gn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
  function Fi(e) {
    try {
      for (Ge = 0; Ge < Se.length; Ge++) {
        const t = Se[Ge];
        t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), dn(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
      }
    } finally {
      for (; Ge < Se.length; Ge++) {
        const t = Se[Ge];
        t && (t.flags &= -2);
      }
      Ge = -1, Se.length = 0, Di(), nr = null, (Se.length || Vt.length) && Fi();
    }
  }
  var Ae = null;
  var Hi = null;
  function rr(e) {
    const t = Ae;
    return Ae = e, Hi = e && e.type.__scopeId || null, t;
  }
  function Ga(e, t = Ae, n) {
    if (!t || e._n) return e;
    const r = (...s) => {
      r._d && ll(-1);
      const i = rr(t);
      let l;
      try {
        l = e(...s);
      } finally {
        rr(i), r._d && ll(1);
      }
      return l;
    };
    return r._n = true, r._c = true, r._d = true, r;
  }
  function sr(e, t) {
    if (Ae === null) return e;
    const n = hr(Ae), r = e.dirs || (e.dirs = []);
    for (let s = 0; s < t.length; s++) {
      let [i, l, o, a = ie] = t[s];
      i && (ee(i) && (i = { mounted: i, updated: i }), i.deep && nt(l), r.push({ dir: i, instance: n, value: l, oldValue: void 0, arg: o, modifiers: a }));
    }
    return e;
  }
  function Et(e, t, n, r) {
    const s = e.dirs, i = t && t.dirs;
    for (let l = 0; l < s.length; l++) {
      const o = s[l];
      i && (o.oldValue = i[l].value);
      let a = o.dir[r];
      a && (_t(), rt(a, n, 8, [e.el, o, e, t]), Ct());
    }
  }
  var Za = Symbol("_vte");
  var Ja = (e) => e.__isTeleport;
  function Yr(e, t) {
    e.shapeFlag & 6 && e.component ? (e.transition = t, Yr(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
  }
  // @__NO_SIDE_EFFECTS__
  function mn(e, t) {
    return ee(e) ? je({ name: e.name }, t, { setup: e }) : e;
  }
  function Ya(e) {
    e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
  }
  function pt(e) {
    const t = cl(), n = Rt(null);
    if (t) {
      const s = t.refs === ie ? t.refs = {} : t.refs;
      Object.defineProperty(s, e, { enumerable: true, get: () => n.value, set: (i) => n.value = i });
    }
    return n;
  }
  function ir(e, t, n, r, s = false) {
    if (q(e)) {
      e.forEach((x, b) => ir(x, t && (q(t) ? t[b] : t), n, r, s));
      return;
    }
    if (vn(r) && !s) {
      r.shapeFlag & 512 && r.type.__asyncResolved && r.component.subTree.component && ir(e, t, n, r.component.subTree);
      return;
    }
    const i = r.shapeFlag & 4 ? hr(r.component) : r.el, l = s ? null : i, { i: o, r: a } = e, c = t && t.r, u = o.refs === ie ? o.refs = {} : o.refs, f = o.setupState, d = Q(f), m = f === ie ? () => false : (x) => X(d, x);
    if (c != null && c !== a && (ye(c) ? (u[c] = null, m(c) && (f[c] = null)) : ve(c) && (c.value = null)), ee(a)) dn(a, o, 12, [l, u]);
    else {
      const x = ye(a), b = ve(a);
      if (x || b) {
        const T = () => {
          if (e.f) {
            const w = x ? m(a) ? f[a] : u[a] : a.value;
            s ? q(w) && si(w, i) : q(w) ? w.includes(i) || w.push(i) : x ? (u[a] = [i], m(a) && (f[a] = u[a])) : (a.value = [i], e.k && (u[e.k] = a.value));
          } else x ? (u[a] = l, m(a) && (f[a] = l)) : b && (a.value = l, e.k && (u[e.k] = l));
        };
        l ? (T.id = -1, Ie(T, n)) : T();
      }
    }
  }
  ln().requestIdleCallback, ln().cancelIdleCallback;
  var vn = (e) => !!e.type.__asyncLoader;
  var Qa = (e) => e.type.__isKeepAlive;
  function Xa(e, t, n = $e, r = false) {
    if (n) {
      const s = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...l) => {
        _t();
        const o = as(n), a = rt(t, n, e, l);
        return o(), Ct(), a;
      });
      return r ? s.unshift(i) : s.push(i), i;
    }
  }
  var Qr = (e) => (t, n = $e) => {
    (!_n || e === "sp") && Xa(e, (...r) => t(...r), n);
  };
  var bn = Qr("m");
  var ec = Qr("bum");
  var Xr = Qr("um");
  var tc = "components";
  function nc(e, t) {
    return sc(tc, e, true, t) || e;
  }
  var rc = Symbol.for("v-ndc");
  function sc(e, t, n = true, r = false) {
    const s = Ae || $e;
    if (s) {
      const i = s.type;
      {
        const o = Uc(i, false);
        if (o && (o === t || o === ze(t) || o === Bn(ze(t)))) return i;
      }
      const l = Ui(s[e] || i[e], t) || Ui(s.appContext[e], t);
      return !l && r ? i : l;
    }
  }
  function Ui(e, t) {
    return e && (e[t] || e[ze(t)] || e[Bn(ze(t))]);
  }
  function Fe(e, t, n, r) {
    let s;
    const i = n, l = q(e);
    if (l || ye(e)) {
      const o = l && Bt(e);
      let a = false;
      o && (a = !De(e), e = Gn(e)), s = new Array(e.length);
      for (let c = 0, u = e.length; c < u; c++) s[c] = t(a ? xe(e[c]) : e[c], c, void 0, i);
    } else if (typeof e == "number") {
      s = new Array(e);
      for (let o = 0; o < e; o++) s[o] = t(o + 1, o, void 0, i);
    } else if (he(e)) if (e[Symbol.iterator]) s = Array.from(e, (o, a) => t(o, a, void 0, i));
    else {
      const o = Object.keys(e);
      s = new Array(o.length);
      for (let a = 0, c = o.length; a < c; a++) {
        const u = o[a];
        s[a] = t(e[u], u, a, i);
      }
    }
    else s = [];
    return s;
  }
  var es = (e) => e ? fl(e) ? hr(e) : es(e.parent) : null;
  var yn = je(/* @__PURE__ */ Object.create(null), { $: (e) => e, $el: (e) => e.vnode.el, $data: (e) => e.data, $props: (e) => e.props, $attrs: (e) => e.attrs, $slots: (e) => e.slots, $refs: (e) => e.refs, $parent: (e) => es(e.parent), $root: (e) => es(e.root), $host: (e) => e.ce, $emit: (e) => e.emit, $options: (e) => e.type, $forceUpdate: (e) => e.f || (e.f = () => {
    Jr(e.update);
  }), $nextTick: (e) => e.n || (e.n = qt.bind(e.proxy)), $watch: (e) => wt });
  var ts = (e, t) => e !== ie && !e.__isScriptSetup && X(e, t);
  var ic = { get({ _: e }, t) {
    if (t === "__v_skip") return true;
    const { ctx: n, setupState: r, data: s, props: i, accessCache: l, type: o, appContext: a } = e;
    let c;
    if (t[0] !== "$") {
      const m = l[t];
      if (m !== void 0) switch (m) {
        case 1:
          return r[t];
        case 2:
          return s[t];
        case 4:
          return n[t];
        case 3:
          return i[t];
      }
      else {
        if (ts(r, t)) return l[t] = 1, r[t];
        if (s !== ie && X(s, t)) return l[t] = 2, s[t];
        if ((c = e.propsOptions[0]) && X(c, t)) return l[t] = 3, i[t];
        if (n !== ie && X(n, t)) return l[t] = 4, n[t];
        l[t] = 0;
      }
    }
    const u = yn[t];
    let f, d;
    if (u) return t === "$attrs" && ke(e.attrs, "get", ""), u(e);
    if ((f = o.__cssModules) && (f = f[t])) return f;
    if (n !== ie && X(n, t)) return l[t] = 4, n[t];
    if (d = a.config.globalProperties, X(d, t)) return d[t];
  }, set({ _: e }, t, n) {
    const { data: r, setupState: s, ctx: i } = e;
    return ts(s, t) ? (s[t] = n, true) : r !== ie && X(r, t) ? (r[t] = n, true) : X(e.props, t) || t[0] === "$" && t.slice(1) in e ? false : (i[t] = n, true);
  }, has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: s, propsOptions: i } }, l) {
    let o;
    return !!n[l] || e !== ie && X(e, l) || ts(t, l) || (o = i[0]) && X(o, l) || X(r, l) || X(yn, l) || X(s.config.globalProperties, l);
  }, defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : X(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  } };
  function Ni() {
    return { app: null, config: { isNativeTag: Yo, performance: false, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} }, mixins: [], components: {}, directives: {}, provides: /* @__PURE__ */ Object.create(null), optionsCache: /* @__PURE__ */ new WeakMap(), propsCache: /* @__PURE__ */ new WeakMap(), emitsCache: /* @__PURE__ */ new WeakMap() };
  }
  var lc = 0;
  function oc(e, t) {
    return function(r, s = null) {
      ee(r) || (r = je({}, r)), s != null && !he(s) && (s = null);
      const i = Ni(), l = /* @__PURE__ */ new WeakSet(), o = [];
      let a = false;
      const c = i.app = { _uid: lc++, _component: r, _props: s, _container: null, _context: i, _instance: null, version: Bc, get config() {
        return i.config;
      }, set config(u) {
      }, use(u, ...f) {
        return l.has(u) || (u && ee(u.install) ? (l.add(u), u.install(c, ...f)) : ee(u) && (l.add(u), u(c, ...f))), c;
      }, mixin(u) {
        return c;
      }, component(u, f) {
        return f ? (i.components[u] = f, c) : i.components[u];
      }, directive(u, f) {
        return f ? (i.directives[u] = f, c) : i.directives[u];
      }, mount(u, f, d) {
        if (!a) {
          const m = c._ceVNode || le(r, s);
          return m.appContext = i, d === true ? d = "svg" : d === false && (d = void 0), e(m, u, d), a = true, c._container = u, u.__vue_app__ = c, hr(m.component);
        }
      }, onUnmount(u) {
        o.push(u);
      }, unmount() {
        a && (rt(o, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
      }, provide(u, f) {
        return i.provides[u] = f, c;
      }, runWithContext(u) {
        const f = Kt;
        Kt = c;
        try {
          return u();
        } finally {
          Kt = f;
        }
      } };
      return c;
    };
  }
  var Kt = null;
  function ac(e, t) {
    if ($e) {
      let n = $e.provides;
      const r = $e.parent && $e.parent.provides;
      r === n && (n = $e.provides = Object.create(r)), n[e] = t;
    }
  }
  function lr(e, t, n = false) {
    const r = $e || Ae;
    if (r || Kt) {
      const s = Kt ? Kt._context.provides : r ? r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides : void 0;
      if (s && e in s) return s[e];
      if (arguments.length > 1) return n && ee(t) ? t.call(r && r.proxy) : t;
    }
  }
  var Bi = {};
  var Vi = () => Object.create(Bi);
  var Wi = (e) => Object.getPrototypeOf(e) === Bi;
  function cc(e, t, n, r = false) {
    const s = {}, i = Vi();
    e.propsDefaults = /* @__PURE__ */ Object.create(null), qi(e, t, s, i);
    for (const l in e.propsOptions[0]) l in s || (s[l] = void 0);
    n ? e.props = r ? s : Ta(s) : e.type.props ? e.props = s : e.props = i, e.attrs = i;
  }
  function uc(e, t, n, r) {
    const { props: s, attrs: i, vnode: { patchFlag: l } } = e, o = Q(s), [a] = e.propsOptions;
    let c = false;
    if ((r || l > 0) && !(l & 16)) {
      if (l & 8) {
        const u = e.vnode.dynamicProps;
        for (let f = 0; f < u.length; f++) {
          let d = u[f];
          if (or(e.emitsOptions, d)) continue;
          const m = t[d];
          if (a) if (X(i, d)) m !== i[d] && (i[d] = m, c = true);
          else {
            const x = ze(d);
            s[x] = ns(a, o, x, m, e, false);
          }
          else m !== i[d] && (i[d] = m, c = true);
        }
      }
    } else {
      qi(e, t, s, i) && (c = true);
      let u;
      for (const f in o) (!t || !X(t, f) && ((u = kt(f)) === f || !X(t, u))) && (a ? n && (n[f] !== void 0 || n[u] !== void 0) && (s[f] = ns(a, o, f, void 0, e, true)) : delete s[f]);
      if (i !== o) for (const f in i) (!t || !X(t, f)) && (delete i[f], c = true);
    }
    c && et(e.attrs, "set", "");
  }
  function qi(e, t, n, r) {
    const [s, i] = e.propsOptions;
    let l = false, o;
    if (t) for (let a in t) {
      if (sn(a)) continue;
      const c = t[a];
      let u;
      s && X(s, u = ze(a)) ? !i || !i.includes(u) ? n[u] = c : (o || (o = {}))[u] = c : or(e.emitsOptions, a) || (!(a in r) || c !== r[a]) && (r[a] = c, l = true);
    }
    if (i) {
      const a = Q(n), c = o || ie;
      for (let u = 0; u < i.length; u++) {
        const f = i[u];
        n[f] = ns(s, a, f, c[f], e, !X(c, f));
      }
    }
    return l;
  }
  function ns(e, t, n, r, s, i) {
    const l = e[n];
    if (l != null) {
      const o = X(l, "default");
      if (o && r === void 0) {
        const a = l.default;
        if (l.type !== Function && !l.skipFactory && ee(a)) {
          const { propsDefaults: c } = s;
          if (n in c) r = c[n];
          else {
            const u = as(s);
            r = c[n] = a.call(null, t), u();
          }
        } else r = a;
        s.ce && s.ce._setProp(n, r);
      }
      l[0] && (i && !o ? r = false : l[1] && (r === "" || r === kt(n)) && (r = true));
    }
    return r;
  }
  function fc(e, t, n = false) {
    const r = t.propsCache, s = r.get(e);
    if (s) return s;
    const i = e.props, l = {}, o = [];
    if (!i) return he(e) && r.set(e, Dt), Dt;
    if (q(i)) for (let c = 0; c < i.length; c++) {
      const u = ze(i[c]);
      Ki(u) && (l[u] = ie);
    }
    else if (i) for (const c in i) {
      const u = ze(c);
      if (Ki(u)) {
        const f = i[c], d = l[u] = q(f) || ee(f) ? { type: f } : je({}, f), m = d.type;
        let x = false, b = true;
        if (q(m)) for (let T = 0; T < m.length; ++T) {
          const w = m[T], C = ee(w) && w.name;
          if (C === "Boolean") {
            x = true;
            break;
          } else C === "String" && (b = false);
        }
        else x = ee(m) && m.name === "Boolean";
        d[0] = x, d[1] = b, (x || X(d, "default")) && o.push(u);
      }
    }
    const a = [l, o];
    return he(e) && r.set(e, a), a;
  }
  function Ki(e) {
    return e[0] !== "$" && !sn(e);
  }
  var Gi = (e) => e[0] === "_" || e === "$stable";
  var rs = (e) => q(e) ? e.map(Ze) : [Ze(e)];
  var hc = (e, t, n) => {
    if (t._n) return t;
    const r = Ga((...s) => rs(t(...s)), n);
    return r._c = false, r;
  };
  var Zi = (e, t, n) => {
    const r = e._ctx;
    for (const s in e) {
      if (Gi(s)) continue;
      const i = e[s];
      if (ee(i)) t[s] = hc(s, i, r);
      else if (i != null) {
        const l = rs(i);
        t[s] = () => l;
      }
    }
  };
  var Ji = (e, t) => {
    const n = rs(t);
    e.slots.default = () => n;
  };
  var Yi = (e, t, n) => {
    for (const r in t) (n || r !== "_") && (e[r] = t[r]);
  };
  var pc = (e, t, n) => {
    const r = e.slots = Vi();
    if (e.vnode.shapeFlag & 32) {
      const s = t._;
      s ? (Yi(r, t, n), n && ci(r, "_", s, true)) : Zi(t, r);
    } else t && Ji(e, t);
  };
  var dc = (e, t, n) => {
    const { vnode: r, slots: s } = e;
    let i = true, l = ie;
    if (r.shapeFlag & 32) {
      const o = t._;
      o ? n && o === 1 ? i = false : Yi(s, t, n) : (i = !t.$stable, Zi(t, s)), l = t;
    } else t && (Ji(e, t), l = { default: 1 });
    if (i) for (const o in s) !Gi(o) && l[o] == null && delete s[o];
  };
  function gc() {
    typeof __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ != "boolean" && (ln().__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false);
  }
  var Ie = Ec;
  function mc(e) {
    return vc(e);
  }
  function vc(e, t) {
    gc();
    const n = ln();
    n.__VUE__ = true;
    const { insert: r, remove: s, patchProp: i, createElement: l, createText: o, createComment: a, setText: c, setElementText: u, parentNode: f, nextSibling: d, setScopeId: m = wt, insertStaticContent: x } = e, b = (h, p, g, y = null, k = null, v = null, A = void 0, S = null, $ = !!p.dynamicChildren) => {
      if (h === p) return;
      h && !xn(h, p) && (y = bt(h), Ue(h, k, v, true), h = null), p.patchFlag === -2 && ($ = false, p.dynamicChildren = null);
      const { type: _, ref: U, shapeFlag: M } = p;
      switch (_) {
        case ar:
          T(h, p, g, y);
          break;
        case It:
          w(h, p, g, y);
          break;
        case is:
          h == null && C(p, g, y, A);
          break;
        case fe:
          B(h, p, g, y, k, v, A, S, $);
          break;
        default:
          M & 1 ? O(h, p, g, y, k, v, A, S, $) : M & 6 ? F(h, p, g, y, k, v, A, S, $) : (M & 64 || M & 128) && _.process(h, p, g, y, k, v, A, S, $, R);
      }
      U != null && k && ir(U, h && h.ref, v, p || h, !p);
    }, T = (h, p, g, y) => {
      if (h == null) r(p.el = o(p.children), g, y);
      else {
        const k = p.el = h.el;
        p.children !== h.children && c(k, p.children);
      }
    }, w = (h, p, g, y) => {
      h == null ? r(p.el = a(p.children || ""), g, y) : p.el = h.el;
    }, C = (h, p, g, y) => {
      [h.el, h.anchor] = x(h.children, p, g, y, h.el, h.anchor);
    }, N = ({ el: h, anchor: p }, g, y) => {
      let k;
      for (; h && h !== p; ) k = d(h), r(h, g, y), h = k;
      r(p, g, y);
    }, I = ({ el: h, anchor: p }) => {
      let g;
      for (; h && h !== p; ) g = d(h), s(h), h = g;
      s(p);
    }, O = (h, p, g, y, k, v, A, S, $) => {
      p.type === "svg" ? A = "svg" : p.type === "math" && (A = "mathml"), h == null ? G(p, g, y, k, v, A, S, $) : ae(h, p, k, v, A, S, $);
    }, G = (h, p, g, y, k, v, A, S) => {
      let $, _;
      const { props: U, shapeFlag: M, transition: H, dirs: V } = h;
      if ($ = h.el = l(h.type, v, U && U.is, U), M & 8 ? u($, h.children) : M & 16 && oe(h.children, $, null, y, k, ss(h, v), A, S), V && Et(h, null, y, "created"), j($, h, h.scopeId, A, y), U) {
        for (const re in U) re !== "value" && !sn(re) && i($, re, null, U[re], v, y);
        "value" in U && i($, "value", null, U.value, v), (_ = U.onVnodeBeforeMount) && Je(_, y, h);
      }
      V && Et(h, null, y, "beforeMount");
      const Z = bc(k, H);
      Z && H.beforeEnter($), r($, p, g), ((_ = U && U.onVnodeMounted) || Z || V) && Ie(() => {
        _ && Je(_, y, h), Z && H.enter($), V && Et(h, null, y, "mounted");
      }, k);
    }, j = (h, p, g, y, k) => {
      if (g && m(h, g), y) for (let v = 0; v < y.length; v++) m(h, y[v]);
      if (k) {
        let v = k.subTree;
        if (p === v || il(v.type) && (v.ssContent === p || v.ssFallback === p)) {
          const A = k.vnode;
          j(h, A, A.scopeId, A.slotScopeIds, k.parent);
        }
      }
    }, oe = (h, p, g, y, k, v, A, S, $ = 0) => {
      for (let _ = $; _ < h.length; _++) {
        const U = h[_] = S ? gt(h[_]) : Ze(h[_]);
        b(null, U, p, g, y, k, v, A, S);
      }
    }, ae = (h, p, g, y, k, v, A) => {
      const S = p.el = h.el;
      let { patchFlag: $, dynamicChildren: _, dirs: U } = p;
      $ |= h.patchFlag & 16;
      const M = h.props || ie, H = p.props || ie;
      let V;
      if (g && Tt(g, false), (V = H.onVnodeBeforeUpdate) && Je(V, g, p, h), U && Et(p, h, g, "beforeUpdate"), g && Tt(g, true), (M.innerHTML && H.innerHTML == null || M.textContent && H.textContent == null) && u(S, ""), _ ? Me(h.dynamicChildren, _, S, g, y, ss(p, k), v) : A || ut(h, p, S, null, g, y, ss(p, k), v, false), $ > 0) {
        if ($ & 16) E(S, M, H, g, k);
        else if ($ & 2 && M.class !== H.class && i(S, "class", null, H.class, k), $ & 4 && i(S, "style", M.style, H.style, k), $ & 8) {
          const Z = p.dynamicProps;
          for (let re = 0; re < Z.length; re++) {
            const ce = Z[re], Pe = M[ce], _e = H[ce];
            (_e !== Pe || ce === "value") && i(S, ce, Pe, _e, k, g);
          }
        }
        $ & 1 && h.children !== p.children && u(S, p.children);
      } else !A && _ == null && E(S, M, H, g, k);
      ((V = H.onVnodeUpdated) || U) && Ie(() => {
        V && Je(V, g, p, h), U && Et(p, h, g, "updated");
      }, y);
    }, Me = (h, p, g, y, k, v, A) => {
      for (let S = 0; S < p.length; S++) {
        const $ = h[S], _ = p[S], U = $.el && ($.type === fe || !xn($, _) || $.shapeFlag & 70) ? f($.el) : g;
        b($, _, U, null, y, k, v, A, true);
      }
    }, E = (h, p, g, y, k) => {
      if (p !== g) {
        if (p !== ie) for (const v in p) !sn(v) && !(v in g) && i(h, v, p[v], null, k, y);
        for (const v in g) {
          if (sn(v)) continue;
          const A = g[v], S = p[v];
          A !== S && v !== "value" && i(h, v, S, A, k, y);
        }
        "value" in g && i(h, "value", p.value, g.value, k);
      }
    }, B = (h, p, g, y, k, v, A, S, $) => {
      const _ = p.el = h ? h.el : o(""), U = p.anchor = h ? h.anchor : o("");
      let { patchFlag: M, dynamicChildren: H, slotScopeIds: V } = p;
      V && (S = S ? S.concat(V) : V), h == null ? (r(_, g, y), r(U, g, y), oe(p.children || [], g, U, k, v, A, S, $)) : M > 0 && M & 64 && H && h.dynamicChildren ? (Me(h.dynamicChildren, H, g, k, v, A, S), (p.key != null || k && p === k.subTree) && Qi(h, p, true)) : ut(h, p, g, U, k, v, A, S, $);
    }, F = (h, p, g, y, k, v, A, S, $) => {
      p.slotScopeIds = S, h == null ? p.shapeFlag & 512 ? k.ctx.activate(p, g, y, A, $) : de(p, g, y, k, v, A, $) : we(h, p, $);
    }, de = (h, p, g, y, k, v, A) => {
      const S = h.component = jc(h, y, k);
      if (Qa(h) && (S.ctx.renderer = R), zc(S, false, A), S.asyncDep) {
        if (k && k.registerDep(S, be, A), !h.el) {
          const $ = S.subTree = le(It);
          w(null, $, p, g);
        }
      } else be(S, h, p, g, k, v, A);
    }, we = (h, p, g) => {
      const y = p.component = h.component;
      if (Rc(h, p, g)) if (y.asyncDep && !y.asyncResolved) {
        Qe(y, p, g);
        return;
      } else y.next = p, y.update();
      else p.el = h.el, y.vnode = p;
    }, be = (h, p, g, y, k, v, A) => {
      const S = () => {
        if (h.isMounted) {
          let { next: M, bu: H, u: V, parent: Z, vnode: re } = h;
          {
            const Xt = Xi(h);
            if (Xt) {
              M && (M.el = re.el, Qe(h, M, A)), Xt.asyncDep.then(() => {
                h.isUnmounted || S();
              });
              return;
            }
          }
          let ce = M, Pe;
          Tt(h, false), M ? (M.el = re.el, Qe(h, M, A)) : M = re, H && Vn(H), (Pe = M.props && M.props.onVnodeBeforeUpdate) && Je(Pe, Z, M, re), Tt(h, true);
          const _e = rl(h), Oe = h.subTree;
          h.subTree = _e, b(Oe, _e, f(Oe.el), bt(Oe), h, k, v), M.el = _e.el, ce === null && Ac(h, _e.el), V && Ie(V, k), (Pe = M.props && M.props.onVnodeUpdated) && Ie(() => Je(Pe, Z, M, re), k);
        } else {
          let M;
          const { props: H } = p, { bm: V, m: Z, parent: re, root: ce, type: Pe } = h, _e = vn(p);
          Tt(h, false), V && Vn(V), !_e && (M = H && H.onVnodeBeforeMount) && Je(M, re, p), Tt(h, true);
          {
            ce.ce && ce.ce._injectChildStyle(Pe);
            const Oe = h.subTree = rl(h);
            b(null, Oe, g, y, h, k, v), p.el = Oe.el;
          }
          if (Z && Ie(Z, k), !_e && (M = H && H.onVnodeMounted)) {
            const Oe = p;
            Ie(() => Je(M, re, Oe), k);
          }
          (p.shapeFlag & 256 || re && vn(re.vnode) && re.vnode.shapeFlag & 256) && h.a && Ie(h.a, k), h.isMounted = true, p = g = y = null;
        }
      };
      h.scope.on();
      const $ = h.effect = new gi(S);
      h.scope.off();
      const _ = h.update = $.run.bind($), U = h.job = $.runIfDirty.bind($);
      U.i = h, U.id = h.uid, $.scheduler = () => Jr(U), Tt(h, true), _();
    }, Qe = (h, p, g) => {
      p.component = h;
      const y = h.vnode.props;
      h.vnode = p, h.next = null, uc(h, p.props, y, g), dc(h, p.children, g), _t(), zi(h), Ct();
    }, ut = (h, p, g, y, k, v, A, S, $ = false) => {
      const _ = h && h.children, U = h ? h.shapeFlag : 0, M = p.children, { patchFlag: H, shapeFlag: V } = p;
      if (H > 0) {
        if (H & 128) {
          Pn(_, M, g, y, k, v, A, S, $);
          return;
        } else if (H & 256) {
          Qt(_, M, g, y, k, v, A, S, $);
          return;
        }
      }
      V & 8 ? (U & 16 && vt(_, k, v), M !== _ && u(g, M)) : U & 16 ? V & 16 ? Pn(_, M, g, y, k, v, A, S, $) : vt(_, k, v, true) : (U & 8 && u(g, ""), V & 16 && oe(M, g, y, k, v, A, S, $));
    }, Qt = (h, p, g, y, k, v, A, S, $) => {
      h = h || Dt, p = p || Dt;
      const _ = h.length, U = p.length, M = Math.min(_, U);
      let H;
      for (H = 0; H < M; H++) {
        const V = p[H] = $ ? gt(p[H]) : Ze(p[H]);
        b(h[H], V, g, null, k, v, A, S, $);
      }
      _ > U ? vt(h, k, v, true, false, M) : oe(p, g, y, k, v, A, S, $, M);
    }, Pn = (h, p, g, y, k, v, A, S, $) => {
      let _ = 0;
      const U = p.length;
      let M = h.length - 1, H = U - 1;
      for (; _ <= M && _ <= H; ) {
        const V = h[_], Z = p[_] = $ ? gt(p[_]) : Ze(p[_]);
        if (xn(V, Z)) b(V, Z, g, null, k, v, A, S, $);
        else break;
        _++;
      }
      for (; _ <= M && _ <= H; ) {
        const V = h[M], Z = p[H] = $ ? gt(p[H]) : Ze(p[H]);
        if (xn(V, Z)) b(V, Z, g, null, k, v, A, S, $);
        else break;
        M--, H--;
      }
      if (_ > M) {
        if (_ <= H) {
          const V = H + 1, Z = V < U ? p[V].el : y;
          for (; _ <= H; ) b(null, p[_] = $ ? gt(p[_]) : Ze(p[_]), g, Z, k, v, A, S, $), _++;
        }
      } else if (_ > H) for (; _ <= M; ) Ue(h[_], k, v, true), _++;
      else {
        const V = _, Z = _, re = /* @__PURE__ */ new Map();
        for (_ = Z; _ <= H; _++) {
          const Ee = p[_] = $ ? gt(p[_]) : Ze(p[_]);
          Ee.key != null && re.set(Ee.key, _);
        }
        let ce, Pe = 0;
        const _e = H - Z + 1;
        let Oe = false, Xt = 0;
        const en = new Array(_e);
        for (_ = 0; _ < _e; _++) en[_] = 0;
        for (_ = V; _ <= M; _++) {
          const Ee = h[_];
          if (Pe >= _e) {
            Ue(Ee, k, v, true);
            continue;
          }
          let We;
          if (Ee.key != null) We = re.get(Ee.key);
          else for (ce = Z; ce <= H; ce++) if (en[ce - Z] === 0 && xn(Ee, p[ce])) {
            We = ce;
            break;
          }
          We === void 0 ? Ue(Ee, k, v, true) : (en[We - Z] = _ + 1, We >= Xt ? Xt = We : Oe = true, b(Ee, p[We], g, null, k, v, A, S, $), Pe++);
        }
        const As = Oe ? yc(en) : Dt;
        for (ce = As.length - 1, _ = _e - 1; _ >= 0; _--) {
          const Ee = Z + _, We = p[Ee], Es = Ee + 1 < U ? p[Ee + 1].el : y;
          en[_] === 0 ? b(null, We, g, Es, k, v, A, S, $) : Oe && (ce < 0 || _ !== As[ce] ? Ot(We, g, Es, 2) : ce--);
        }
      }
    }, Ot = (h, p, g, y, k = null) => {
      const { el: v, type: A, transition: S, children: $, shapeFlag: _ } = h;
      if (_ & 6) {
        Ot(h.component.subTree, p, g, y);
        return;
      }
      if (_ & 128) {
        h.suspense.move(p, g, y);
        return;
      }
      if (_ & 64) {
        A.move(h, p, g, R);
        return;
      }
      if (A === fe) {
        r(v, p, g);
        for (let M = 0; M < $.length; M++) Ot($[M], p, g, y);
        r(h.anchor, p, g);
        return;
      }
      if (A === is) {
        N(h, p, g);
        return;
      }
      if (y !== 2 && _ & 1 && S) if (y === 0) S.beforeEnter(v), r(v, p, g), Ie(() => S.enter(v), k);
      else {
        const { leave: M, delayLeave: H, afterLeave: V } = S, Z = () => r(v, p, g), re = () => {
          M(v, () => {
            Z(), V && V();
          });
        };
        H ? H(v, Z, re) : re();
      }
      else r(v, p, g);
    }, Ue = (h, p, g, y = false, k = false) => {
      const { type: v, props: A, ref: S, children: $, dynamicChildren: _, shapeFlag: U, patchFlag: M, dirs: H, cacheIndex: V } = h;
      if (M === -2 && (k = false), S != null && ir(S, null, g, h, true), V != null && (p.renderCache[V] = void 0), U & 256) {
        p.ctx.deactivate(h);
        return;
      }
      const Z = U & 1 && H, re = !vn(h);
      let ce;
      if (re && (ce = A && A.onVnodeBeforeUnmount) && Je(ce, p, h), U & 6) jn(h.component, g, y);
      else {
        if (U & 128) {
          h.suspense.unmount(g, y);
          return;
        }
        Z && Et(h, null, p, "beforeUnmount"), U & 64 ? h.type.remove(h, p, g, R, y) : _ && !_.hasOnce && (v !== fe || M > 0 && M & 64) ? vt(_, p, g, false, true) : (v === fe && M & 384 || !k && U & 16) && vt($, p, g), y && On(h);
      }
      (re && (ce = A && A.onVnodeUnmounted) || Z) && Ie(() => {
        ce && Je(ce, p, h), Z && Et(h, null, p, "unmounted");
      }, g);
    }, On = (h) => {
      const { type: p, el: g, anchor: y, transition: k } = h;
      if (p === fe) {
        Ar(g, y);
        return;
      }
      if (p === is) {
        I(h);
        return;
      }
      const v = () => {
        s(g), k && !k.persisted && k.afterLeave && k.afterLeave();
      };
      if (h.shapeFlag & 1 && k && !k.persisted) {
        const { leave: A, delayLeave: S } = k, $ = () => A(g, v);
        S ? S(h.el, v, $) : $();
      } else v();
    }, Ar = (h, p) => {
      let g;
      for (; h !== p; ) g = d(h), s(h), h = g;
      s(p);
    }, jn = (h, p, g) => {
      const { bum: y, scope: k, job: v, subTree: A, um: S, m: $, a: _ } = h;
      el($), el(_), y && Vn(y), k.stop(), v && (v.flags |= 8, Ue(A, h, p, g)), S && Ie(S, p), Ie(() => {
        h.isUnmounted = true;
      }, p), p && p.pendingBranch && !p.isUnmounted && h.asyncDep && !h.asyncResolved && h.suspenseId === p.pendingId && (p.deps--, p.deps === 0 && p.resolve());
    }, vt = (h, p, g, y = false, k = false, v = 0) => {
      for (let A = v; A < h.length; A++) Ue(h[A], p, g, y, k);
    }, bt = (h) => {
      if (h.shapeFlag & 6) return bt(h.component.subTree);
      if (h.shapeFlag & 128) return h.suspense.next();
      const p = d(h.anchor || h.el), g = p && p[Za];
      return g ? d(g) : p;
    };
    let jt = false;
    const z = (h, p, g) => {
      h == null ? p._vnode && Ue(p._vnode, null, null, true) : b(p._vnode || null, h, p, null, null, null, g), p._vnode = h, jt || (jt = true, zi(), Di(), jt = false);
    }, R = { p: b, um: Ue, m: Ot, r: On, mt: de, mc: oe, pc: ut, pbc: Me, n: bt, o: e };
    return { render: z, hydrate: void 0, createApp: oc(z) };
  }
  function ss({ type: e, props: t }, n) {
    return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
  }
  function Tt({ effect: e, job: t }, n) {
    n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
  }
  function bc(e, t) {
    return (!e || e && !e.pendingBranch) && t && !t.persisted;
  }
  function Qi(e, t, n = false) {
    const r = e.children, s = t.children;
    if (q(r) && q(s)) for (let i = 0; i < r.length; i++) {
      const l = r[i];
      let o = s[i];
      o.shapeFlag & 1 && !o.dynamicChildren && ((o.patchFlag <= 0 || o.patchFlag === 32) && (o = s[i] = gt(s[i]), o.el = l.el), !n && o.patchFlag !== -2 && Qi(l, o)), o.type === ar && (o.el = l.el);
    }
  }
  function yc(e) {
    const t = e.slice(), n = [0];
    let r, s, i, l, o;
    const a = e.length;
    for (r = 0; r < a; r++) {
      const c = e[r];
      if (c !== 0) {
        if (s = n[n.length - 1], e[s] < c) {
          t[r] = s, n.push(r);
          continue;
        }
        for (i = 0, l = n.length - 1; i < l; ) o = i + l >> 1, e[n[o]] < c ? i = o + 1 : l = o;
        c < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), n[i] = r);
      }
    }
    for (i = n.length, l = n[i - 1]; i-- > 0; ) n[i] = l, l = t[l];
    return n;
  }
  function Xi(e) {
    const t = e.subTree.component;
    if (t) return t.asyncDep && !t.asyncResolved ? t : Xi(t);
  }
  function el(e) {
    if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
  }
  var wc = Symbol.for("v-scx");
  var kc = () => lr(wc);
  function tl(e, t) {
    return nl(e, null, t);
  }
  function dt(e, t, n) {
    return nl(e, t, n);
  }
  function nl(e, t, n = ie) {
    const { immediate: r, flush: s } = n, i = je({}, n), l = t && r || !t && s !== "post";
    let o;
    if (_n) {
      if (s === "sync") {
        const f = kc();
        o = f.__watcherHandles || (f.__watcherHandles = []);
      } else if (!l) {
        const f = () => {
        };
        return f.stop = wt, f.resume = wt, f.pause = wt, f;
      }
    }
    const a = $e;
    i.call = (f, d, m) => rt(f, a, d, m);
    let c = false;
    s === "post" ? i.scheduler = (f) => {
      Ie(f, a && a.suspense);
    } : s !== "sync" && (c = true, i.scheduler = (f, d) => {
      d ? f() : Jr(f);
    }), i.augmentJob = (f) => {
      t && (f.flags |= 4), c && (f.flags |= 2, a && (f.id = a.uid, f.i = a));
    };
    const u = Va(e, t, i);
    return _n && (o ? o.push(u) : l && u()), u;
  }
  var xc = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${ze(t)}Modifiers`] || e[`${kt(t)}Modifiers`];
  function _c(e, t, ...n) {
    if (e.isUnmounted) return;
    const r = e.vnode.props || ie;
    let s = n;
    const i = t.startsWith("update:"), l = i && xc(r, t.slice(7));
    l && (l.trim && (s = n.map((u) => ye(u) ? u.trim() : u)), l.number && (s = n.map(Wn)));
    let o, a = r[o = jr(t)] || r[o = jr(ze(t))];
    !a && i && (a = r[o = jr(kt(t))]), a && rt(a, e, 6, s);
    const c = r[o + "Once"];
    if (c) {
      if (!e.emitted) e.emitted = {};
      else if (e.emitted[o]) return;
      e.emitted[o] = true, rt(c, e, 6, s);
    }
  }
  function Cc(e, t, n = false) {
    const r = t.emitsCache, s = r.get(e);
    if (s !== void 0) return s;
    const i = e.emits;
    let l = {};
    return i ? (q(i) ? i.forEach((o) => l[o] = null) : je(l, i), he(e) && r.set(e, l), l) : (he(e) && r.set(e, null), null);
  }
  function or(e, t) {
    return !e || !Un(t) ? false : (t = t.slice(2).replace(/Once$/, ""), X(e, t[0].toLowerCase() + t.slice(1)) || X(e, kt(t)) || X(e, t));
  }
  function rl(e) {
    const { type: t, vnode: n, proxy: r, withProxy: s, propsOptions: [i], slots: l, attrs: o, emit: a, render: c, renderCache: u, props: f, data: d, setupState: m, ctx: x, inheritAttrs: b } = e, T = rr(e);
    let w, C;
    try {
      if (n.shapeFlag & 4) {
        const I = s || r, O = I;
        w = Ze(c.call(O, I, u, f, m, d, x)), C = o;
      } else {
        const I = t;
        w = Ze(I.length > 1 ? I(f, { attrs: o, slots: l, emit: a }) : I(f, null)), C = t.props ? o : Sc(o);
      }
    } catch (I) {
      wn.length = 0, tr(I, e, 1), w = le(It);
    }
    let N = w;
    if (C && b !== false) {
      const I = Object.keys(C), { shapeFlag: O } = N;
      I.length && O & 7 && (i && I.some(Pr) && (C = $c(C, i)), N = Gt(N, C, false, true));
    }
    return n.dirs && (N = Gt(N, null, false, true), N.dirs = N.dirs ? N.dirs.concat(n.dirs) : n.dirs), n.transition && Yr(N, n.transition), w = N, rr(T), w;
  }
  var Sc = (e) => {
    let t;
    for (const n in e) (n === "class" || n === "style" || Un(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  };
  var $c = (e, t) => {
    const n = {};
    for (const r in e) (!Pr(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
  function Rc(e, t, n) {
    const { props: r, children: s, component: i } = e, { props: l, children: o, patchFlag: a } = t, c = i.emitsOptions;
    if (t.dirs || t.transition) return true;
    if (n && a >= 0) {
      if (a & 1024) return true;
      if (a & 16) return r ? sl(r, l, c) : !!l;
      if (a & 8) {
        const u = t.dynamicProps;
        for (let f = 0; f < u.length; f++) {
          const d = u[f];
          if (l[d] !== r[d] && !or(c, d)) return true;
        }
      }
    } else return (s || o) && (!o || !o.$stable) ? true : r === l ? false : r ? l ? sl(r, l, c) : true : !!l;
    return false;
  }
  function sl(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length) return true;
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      if (t[i] !== e[i] && !or(n, i)) return true;
    }
    return false;
  }
  function Ac({ vnode: e, parent: t }, n) {
    for (; t; ) {
      const r = t.subTree;
      if (r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e) (e = t.vnode).el = n, t = t.parent;
      else break;
    }
  }
  var il = (e) => e.__isSuspense;
  function Ec(e, t) {
    t && t.pendingBranch ? q(e) ? t.effects.push(...e) : t.effects.push(e) : Ka(e);
  }
  var fe = Symbol.for("v-fgt");
  var ar = Symbol.for("v-txt");
  var It = Symbol.for("v-cmt");
  var is = Symbol.for("v-stc");
  var wn = [];
  var Le = null;
  function L(e = false) {
    wn.push(Le = e ? null : []);
  }
  function Tc() {
    wn.pop(), Le = wn[wn.length - 1] || null;
  }
  var kn = 1;
  function ll(e, t = false) {
    kn += e, e < 0 && Le && t && (Le.hasOnce = true);
  }
  function ol(e) {
    return e.dynamicChildren = kn > 0 ? Le || Dt : null, Tc(), kn > 0 && Le && Le.push(e), e;
  }
  function P(e, t, n, r, s, i) {
    return ol(D(e, t, n, r, s, i, true));
  }
  function st(e, t, n, r, s) {
    return ol(le(e, t, n, r, s, true));
  }
  function cr(e) {
    return e ? e.__v_isVNode === true : false;
  }
  function xn(e, t) {
    return e.type === t.type && e.key === t.key;
  }
  var al = ({ key: e }) => e ?? null;
  var ur = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e != null ? ye(e) || ve(e) || ee(e) ? { i: Ae, r: e, k: t, f: !!n } : e : null);
  function D(e, t = null, n = null, r = 0, s = null, i = e === fe ? 0 : 1, l = false, o = false) {
    const a = { __v_isVNode: true, __v_skip: true, type: e, props: t, key: t && al(t), ref: t && ur(t), scopeId: Hi, slotScopeIds: null, children: n, component: null, suspense: null, ssContent: null, ssFallback: null, dirs: null, transition: null, el: null, anchor: null, target: null, targetStart: null, targetAnchor: null, staticCount: 0, shapeFlag: i, patchFlag: r, dynamicProps: s, dynamicChildren: null, appContext: null, ctx: Ae };
    return o ? (ls(a, n), i & 128 && e.normalize(a)) : n && (a.shapeFlag |= ye(n) ? 8 : 16), kn > 0 && !l && Le && (a.patchFlag > 0 || i & 6) && a.patchFlag !== 32 && Le.push(a), a;
  }
  var le = Ic;
  function Ic(e, t = null, n = null, r = 0, s = null, i = false) {
    if ((!e || e === rc) && (e = It), cr(e)) {
      const o = Gt(e, t, true);
      return n && ls(o, n), kn > 0 && !i && Le && (o.shapeFlag & 6 ? Le[Le.indexOf(e)] = o : Le.push(o)), o.patchFlag = -2, o;
    }
    if (Nc(e) && (e = e.__vccOpts), t) {
      t = Lc(t);
      let { class: o, style: a } = t;
      o && !ye(o) && (t.class = me(o)), he(a) && (Gr(a) && !q(a) && (a = je({}, a)), t.style = on(a));
    }
    const l = ye(e) ? 1 : il(e) ? 128 : Ja(e) ? 64 : he(e) ? 4 : ee(e) ? 2 : 0;
    return D(e, t, n, r, s, l, i, true);
  }
  function Lc(e) {
    return e ? Gr(e) || Wi(e) ? je({}, e) : e : null;
  }
  function Gt(e, t, n = false, r = false) {
    const { props: s, ref: i, patchFlag: l, children: o, transition: a } = e, c = t ? Mc(s || {}, t) : s, u = { __v_isVNode: true, __v_skip: true, type: e.type, props: c, key: c && al(c), ref: t && t.ref ? n && i ? q(i) ? i.concat(ur(t)) : [i, ur(t)] : ur(t) : i, scopeId: e.scopeId, slotScopeIds: e.slotScopeIds, children: o, target: e.target, targetStart: e.targetStart, targetAnchor: e.targetAnchor, staticCount: e.staticCount, shapeFlag: e.shapeFlag, patchFlag: t && e.type !== fe ? l === -1 ? 16 : l | 16 : l, dynamicProps: e.dynamicProps, dynamicChildren: e.dynamicChildren, appContext: e.appContext, dirs: e.dirs, transition: a, component: e.component, suspense: e.suspense, ssContent: e.ssContent && Gt(e.ssContent), ssFallback: e.ssFallback && Gt(e.ssFallback), el: e.el, anchor: e.anchor, ctx: e.ctx, ce: e.ce };
    return a && r && Yr(u, a.clone(u)), u;
  }
  function it(e = " ", t = 0) {
    return le(ar, null, e, t);
  }
  function J(e = "", t = false) {
    return t ? (L(), st(It, null, e)) : le(It, null, e);
  }
  function Ze(e) {
    return e == null || typeof e == "boolean" ? le(It) : q(e) ? le(fe, null, e.slice()) : cr(e) ? gt(e) : le(ar, null, String(e));
  }
  function gt(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : Gt(e);
  }
  function ls(e, t) {
    let n = 0;
    const { shapeFlag: r } = e;
    if (t == null) t = null;
    else if (q(t)) n = 16;
    else if (typeof t == "object") if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = false), ls(e, s()), s._c && (s._d = true));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !Wi(t) ? t._ctx = Ae : s === 3 && Ae && (Ae.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
    else ee(t) ? (t = { default: t, _ctx: Ae }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [it(t)]) : n = 8);
    e.children = t, e.shapeFlag |= n;
  }
  function Mc(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n];
      for (const s in r) if (s === "class") t.class !== r.class && (t.class = me([t.class, r.class]));
      else if (s === "style") t.style = on([t.style, r.style]);
      else if (Un(s)) {
        const i = t[s], l = r[s];
        l && i !== l && !(q(i) && i.includes(l)) && (t[s] = i ? [].concat(i, l) : l);
      } else s !== "" && (t[s] = r[s]);
    }
    return t;
  }
  function Je(e, t, n, r = null) {
    rt(e, t, 7, [n, r]);
  }
  var Pc = Ni();
  var Oc = 0;
  function jc(e, t, n) {
    const r = e.type, s = (t ? t.appContext : e.appContext) || Pc, i = { uid: Oc++, vnode: e, type: r, parent: t, appContext: s, root: null, next: null, subTree: null, effect: null, update: null, job: null, scope: new ca(true), render: null, proxy: null, exposed: null, exposeProxy: null, withProxy: null, provides: t ? t.provides : Object.create(s.provides), ids: t ? t.ids : ["", 0, 0], accessCache: null, renderCache: [], components: null, directives: null, propsOptions: fc(r, s), emitsOptions: Cc(r, s), emit: null, emitted: null, propsDefaults: ie, inheritAttrs: r.inheritAttrs, ctx: ie, data: ie, props: ie, attrs: ie, slots: ie, refs: ie, setupState: ie, setupContext: null, suspense: n, suspenseId: n ? n.pendingId : 0, asyncDep: null, asyncResolved: false, isMounted: false, isUnmounted: false, isDeactivated: false, bc: null, c: null, bm: null, m: null, bu: null, u: null, um: null, bum: null, da: null, a: null, rtg: null, rtc: null, ec: null, sp: null };
    return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = _c.bind(null, i), e.ce && e.ce(i), i;
  }
  var $e = null;
  var cl = () => $e || Ae;
  var fr;
  var os;
  {
    const e = ln(), t = (n, r) => {
      let s;
      return (s = e[n]) || (s = e[n] = []), s.push(r), (i) => {
        s.length > 1 ? s.forEach((l) => l(i)) : s[0](i);
      };
    };
    fr = t("__VUE_INSTANCE_SETTERS__", (n) => $e = n), os = t("__VUE_SSR_SETTERS__", (n) => _n = n);
  }
  var as = (e) => {
    const t = $e;
    return fr(e), e.scope.on(), () => {
      e.scope.off(), fr(t);
    };
  };
  var ul = () => {
    $e && $e.scope.off(), fr(null);
  };
  function fl(e) {
    return e.vnode.shapeFlag & 4;
  }
  var _n = false;
  function zc(e, t = false, n = false) {
    t && os(t);
    const { props: r, children: s } = e.vnode, i = fl(e);
    cc(e, r, i, t), pc(e, s, n);
    const l = i ? Dc(e, t) : void 0;
    return t && os(false), l;
  }
  function Dc(e, t) {
    const n = e.type;
    e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, ic);
    const { setup: r } = n;
    if (r) {
      _t();
      const s = e.setupContext = r.length > 1 ? Hc(e) : null, i = as(e), l = dn(r, e, 0, [e.props, s]), o = li(l);
      if (Ct(), i(), (o || e.sp) && !vn(e) && Ya(e), o) {
        if (l.then(ul, ul), t) return l.then((a) => {
          hl(e, a, t);
        }).catch((a) => {
          tr(a, e, 0);
        });
        e.asyncDep = l;
      } else hl(e, l, t);
    } else dl(e, t);
  }
  function hl(e, t, n) {
    ee(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : he(t) && (e.setupState = Pi(t)), dl(e, n);
  }
  var pl;
  function dl(e, t, n) {
    const r = e.type;
    if (!e.render) {
      if (!t && pl && !r.render) {
        const s = r.template || false;
        if (s) {
          const { isCustomElement: i, compilerOptions: l } = e.appContext.config, { delimiters: o, compilerOptions: a } = r, c = je(je({ isCustomElement: i, delimiters: o }, l), a);
          r.render = pl(s, c);
        }
      }
      e.render = r.render || wt;
    }
  }
  var Fc = { get(e, t) {
    return ke(e, "get", ""), e[t];
  } };
  function Hc(e) {
    const t = (n) => {
      e.exposed = n || {};
    };
    return { attrs: new Proxy(e.attrs, Fc), slots: e.slots, emit: e.emit, expose: t };
  }
  function hr(e) {
    return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Pi(La(e.exposed)), { get(t, n) {
      if (n in t) return t[n];
      if (n in yn) return yn[n](e);
    }, has(t, n) {
      return n in t || n in yn;
    } })) : e.proxy;
  }
  function Uc(e, t = true) {
    return ee(e) ? e.displayName || e.name : e.name || t && e.__name;
  }
  function Nc(e) {
    return ee(e) && "__vccOpts" in e;
  }
  var ge = (e, t) => Na(e, t, _n);
  function te(e, t, n) {
    const r = arguments.length;
    return r === 2 ? he(t) && !q(t) ? cr(t) ? le(e, null, [t]) : le(e, t) : le(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && cr(n) && (n = [n]), le(e, t, n));
  }
  var Bc = "3.5.13";
  var cs;
  var gl = typeof window < "u" && window.trustedTypes;
  if (gl) try {
    cs = gl.createPolicy("vue", { createHTML: (e) => e });
  } catch {
  }
  var ml = cs ? (e) => cs.createHTML(e) : (e) => e;
  var Vc = "http://www.w3.org/2000/svg";
  var Wc = "http://www.w3.org/1998/Math/MathML";
  var lt = typeof document < "u" ? document : null;
  var vl = lt && lt.createElement("template");
  var qc = { insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  }, remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  }, createElement: (e, t, n, r) => {
    const s = t === "svg" ? lt.createElementNS(Vc, e) : t === "mathml" ? lt.createElementNS(Wc, e) : n ? lt.createElement(e, { is: n }) : lt.createElement(e);
    return e === "select" && r && r.multiple != null && s.setAttribute("multiple", r.multiple), s;
  }, createText: (e) => lt.createTextNode(e), createComment: (e) => lt.createComment(e), setText: (e, t) => {
    e.nodeValue = t;
  }, setElementText: (e, t) => {
    e.textContent = t;
  }, parentNode: (e) => e.parentNode, nextSibling: (e) => e.nextSibling, querySelector: (e) => lt.querySelector(e), setScopeId(e, t) {
    e.setAttribute(t, "");
  }, insertStaticContent(e, t, n, r, s, i) {
    const l = n ? n.previousSibling : t.lastChild;
    if (s && (s === i || s.nextSibling)) for (; t.insertBefore(s.cloneNode(true), n), !(s === i || !(s = s.nextSibling)); ) ;
    else {
      vl.innerHTML = ml(r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e);
      const o = vl.content;
      if (r === "svg" || r === "mathml") {
        const a = o.firstChild;
        for (; a.firstChild; ) o.appendChild(a.firstChild);
        o.removeChild(a);
      }
      t.insertBefore(o, n);
    }
    return [l ? l.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
  } };
  var Kc = Symbol("_vtc");
  function Gc(e, t, n) {
    const r = e[Kc];
    r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
  }
  var pr = Symbol("_vod");
  var bl = Symbol("_vsh");
  var yl = { beforeMount(e, { value: t }, { transition: n }) {
    e[pr] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : Cn(e, t);
  }, mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  }, updated(e, { value: t, oldValue: n }, { transition: r }) {
    !t != !n && (r ? t ? (r.beforeEnter(e), Cn(e, true), r.enter(e)) : r.leave(e, () => {
      Cn(e, false);
    }) : Cn(e, t));
  }, beforeUnmount(e, { value: t }) {
    Cn(e, t);
  } };
  function Cn(e, t) {
    e.style.display = t ? e[pr] : "none", e[bl] = !t;
  }
  var Zc = Symbol("");
  var Jc = /(^|;)\s*display\s*:/;
  function Yc(e, t, n) {
    const r = e.style, s = ye(n);
    let i = false;
    if (n && !s) {
      if (t) if (ye(t)) for (const l of t.split(";")) {
        const o = l.slice(0, l.indexOf(":")).trim();
        n[o] == null && dr(r, o, "");
      }
      else for (const l in t) n[l] == null && dr(r, l, "");
      for (const l in n) l === "display" && (i = true), dr(r, l, n[l]);
    } else if (s) {
      if (t !== n) {
        const l = r[Zc];
        l && (n += ";" + l), r.cssText = n, i = Jc.test(n);
      }
    } else t && e.removeAttribute("style");
    pr in e && (e[pr] = i ? r.display : "", e[bl] && (r.display = "none"));
  }
  var wl = /\s*!important$/;
  function dr(e, t, n) {
    if (q(n)) n.forEach((r) => dr(e, t, r));
    else if (n == null && (n = ""), t.startsWith("--")) e.setProperty(t, n);
    else {
      const r = Qc(e, t);
      wl.test(n) ? e.setProperty(kt(r), n.replace(wl, ""), "important") : e[r] = n;
    }
  }
  var kl = ["Webkit", "Moz", "ms"];
  var us = {};
  function Qc(e, t) {
    const n = us[t];
    if (n) return n;
    let r = ze(t);
    if (r !== "filter" && r in e) return us[t] = r;
    r = Bn(r);
    for (let s = 0; s < kl.length; s++) {
      const i = kl[s] + r;
      if (i in e) return us[t] = i;
    }
    return t;
  }
  var xl = "http://www.w3.org/1999/xlink";
  function _l(e, t, n, r, s, i = oa(t)) {
    r && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(xl, t.slice(6, t.length)) : e.setAttributeNS(xl, t, n) : n == null || i && !fi(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : Ke(n) ? String(n) : n);
  }
  function Cl(e, t, n, r, s) {
    if (t === "innerHTML" || t === "textContent") {
      n != null && (e[t] = t === "innerHTML" ? ml(n) : n);
      return;
    }
    const i = e.tagName;
    if (t === "value" && i !== "PROGRESS" && !i.includes("-")) {
      const o = i === "OPTION" ? e.getAttribute("value") || "" : e.value, a = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
      (o !== a || !("_value" in e)) && (e.value = a), n == null && e.removeAttribute(t), e._value = n;
      return;
    }
    let l = false;
    if (n === "" || n == null) {
      const o = typeof e[t];
      o === "boolean" ? n = fi(n) : n == null && o === "string" ? (n = "", l = true) : o === "number" && (n = 0, l = true);
    }
    try {
      e[t] = n;
    } catch {
    }
    l && e.removeAttribute(s || t);
  }
  function ot(e, t, n, r) {
    e.addEventListener(t, n, r);
  }
  function Xc(e, t, n, r) {
    e.removeEventListener(t, n, r);
  }
  var Sl = Symbol("_vei");
  function eu(e, t, n, r, s = null) {
    const i = e[Sl] || (e[Sl] = {}), l = i[t];
    if (r && l) l.value = r;
    else {
      const [o, a] = tu(t);
      if (r) {
        const c = i[t] = su(r, s);
        ot(e, o, c, a);
      } else l && (Xc(e, o, l, a), i[t] = void 0);
    }
  }
  var $l = /(?:Once|Passive|Capture)$/;
  function tu(e) {
    let t;
    if ($l.test(e)) {
      t = {};
      let r;
      for (; r = e.match($l); ) e = e.slice(0, e.length - r[0].length), t[r[0].toLowerCase()] = true;
    }
    return [e[2] === ":" ? e.slice(3) : kt(e.slice(2)), t];
  }
  var fs = 0;
  var nu = Promise.resolve();
  var ru = () => fs || (nu.then(() => fs = 0), fs = Date.now());
  function su(e, t) {
    const n = (r) => {
      if (!r._vts) r._vts = Date.now();
      else if (r._vts <= n.attached) return;
      rt(iu(r, n.value), t, 5, [r]);
    };
    return n.value = e, n.attached = ru(), n;
  }
  function iu(e, t) {
    if (q(t)) {
      const n = e.stopImmediatePropagation;
      return e.stopImmediatePropagation = () => {
        n.call(e), e._stopped = true;
      }, t.map((r) => (s) => !s._stopped && r && r(s));
    } else return t;
  }
  var Rl = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123;
  var lu = (e, t, n, r, s, i) => {
    const l = s === "svg";
    t === "class" ? Gc(e, r, l) : t === "style" ? Yc(e, n, r) : Un(t) ? Pr(t) || eu(e, t, n, r, i) : (t[0] === "." ? (t = t.slice(1), true) : t[0] === "^" ? (t = t.slice(1), false) : ou(e, t, r, l)) ? (Cl(e, t, r), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && _l(e, t, r, l, i, t !== "value")) : e._isVueCE && (/[A-Z]/.test(t) || !ye(r)) ? Cl(e, ze(t), r, i, t) : (t === "true-value" ? e._trueValue = r : t === "false-value" && (e._falseValue = r), _l(e, t, r, l));
  };
  function ou(e, t, n, r) {
    if (r) return !!(t === "innerHTML" || t === "textContent" || t in e && Rl(t) && ee(n));
    if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return false;
    if (t === "width" || t === "height") {
      const s = e.tagName;
      if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE") return false;
    }
    return Rl(t) && ye(n) ? false : t in e;
  }
  var mt = (e) => {
    const t = e.props["onUpdate:modelValue"] || false;
    return q(t) ? (n) => Vn(t, n) : t;
  };
  function au(e) {
    e.target.composing = true;
  }
  function Al(e) {
    const t = e.target;
    t.composing && (t.composing = false, t.dispatchEvent(new Event("input")));
  }
  var He = Symbol("_assign");
  var hs = { created(e, { modifiers: { lazy: t, trim: n, number: r } }, s) {
    e[He] = mt(s);
    const i = r || s.props && s.props.type === "number";
    ot(e, t ? "change" : "input", (l) => {
      if (l.target.composing) return;
      let o = e.value;
      n && (o = o.trim()), i && (o = Wn(o)), e[He](o);
    }), n && ot(e, "change", () => {
      e.value = e.value.trim();
    }), t || (ot(e, "compositionstart", au), ot(e, "compositionend", Al), ot(e, "change", Al));
  }, mounted(e, { value: t }) {
    e.value = t ?? "";
  }, beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: r, trim: s, number: i } }, l) {
    if (e[He] = mt(l), e.composing) return;
    const o = (i || e.type === "number") && !/^0\d/.test(e.value) ? Wn(e.value) : e.value, a = t ?? "";
    o !== a && (document.activeElement === e && e.type !== "range" && (r && t === n || s && e.value.trim() === a) || (e.value = a));
  } };
  var cu = { deep: true, created(e, t, n) {
    e[He] = mt(n), ot(e, "change", () => {
      const r = e._modelValue, s = Zt(e), i = e.checked, l = e[He];
      if (q(r)) {
        const o = zr(r, s), a = o !== -1;
        if (i && !a) l(r.concat(s));
        else if (!i && a) {
          const c = [...r];
          c.splice(o, 1), l(c);
        }
      } else if (Ht(r)) {
        const o = new Set(r);
        i ? o.add(s) : o.delete(s), l(o);
      } else l(Il(e, i));
    });
  }, mounted: El, beforeUpdate(e, t, n) {
    e[He] = mt(n), El(e, t, n);
  } };
  function El(e, { value: t, oldValue: n }, r) {
    e._modelValue = t;
    let s;
    if (q(t)) s = zr(t, r.props.value) > -1;
    else if (Ht(t)) s = t.has(r.props.value);
    else {
      if (t === n) return;
      s = xt(t, Il(e, true));
    }
    e.checked !== s && (e.checked = s);
  }
  var uu = { created(e, { value: t }, n) {
    e.checked = xt(t, n.props.value), e[He] = mt(n), ot(e, "change", () => {
      e[He](Zt(e));
    });
  }, beforeUpdate(e, { value: t, oldValue: n }, r) {
    e[He] = mt(r), t !== n && (e.checked = xt(t, r.props.value));
  } };
  var fu = { deep: true, created(e, { value: t, modifiers: { number: n } }, r) {
    const s = Ht(t);
    ot(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (l) => l.selected).map((l) => n ? Wn(Zt(l)) : Zt(l));
      e[He](e.multiple ? s ? new Set(i) : i : i[0]), e._assigning = true, qt(() => {
        e._assigning = false;
      });
    }), e[He] = mt(r);
  }, mounted(e, { value: t }) {
    Tl(e, t);
  }, beforeUpdate(e, t, n) {
    e[He] = mt(n);
  }, updated(e, { value: t }) {
    e._assigning || Tl(e, t);
  } };
  function Tl(e, t) {
    const n = e.multiple, r = q(t);
    if (!(n && !r && !Ht(t))) {
      for (let s = 0, i = e.options.length; s < i; s++) {
        const l = e.options[s], o = Zt(l);
        if (n) if (r) {
          const a = typeof o;
          a === "string" || a === "number" ? l.selected = t.some((c) => String(c) === String(o)) : l.selected = zr(t, o) > -1;
        } else l.selected = t.has(o);
        else if (xt(Zt(l), t)) {
          e.selectedIndex !== s && (e.selectedIndex = s);
          return;
        }
      }
      !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
    }
  }
  function Zt(e) {
    return "_value" in e ? e._value : e.value;
  }
  function Il(e, t) {
    const n = t ? "_trueValue" : "_falseValue";
    return n in e ? e[n] : t;
  }
  var hu = { created(e, t, n) {
    gr(e, t, n, null, "created");
  }, mounted(e, t, n) {
    gr(e, t, n, null, "mounted");
  }, beforeUpdate(e, t, n, r) {
    gr(e, t, n, r, "beforeUpdate");
  }, updated(e, t, n, r) {
    gr(e, t, n, r, "updated");
  } };
  function pu(e, t) {
    switch (e) {
      case "SELECT":
        return fu;
      case "TEXTAREA":
        return hs;
      default:
        switch (t) {
          case "checkbox":
            return cu;
          case "radio":
            return uu;
          default:
            return hs;
        }
    }
  }
  function gr(e, t, n, r, s) {
    const l = pu(e.tagName, n.props && n.props.type)[s];
    l && l(e, t, n, r);
  }
  var du = je({ patchProp: lu }, qc);
  var Ll;
  function gu() {
    return Ll || (Ll = mc(du));
  }
  var mu = (...e) => {
    const t = gu().createApp(...e), { mount: n } = t;
    return t.mount = (r) => {
      const s = bu(r);
      if (!s) return;
      const i = t._component;
      !ee(i) && !i.render && !i.template && (i.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
      const l = n(s, false, vu(s));
      return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), l;
    }, t;
  };
  function vu(e) {
    if (e instanceof SVGElement) return "svg";
    if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
  }
  function bu(e) {
    return ye(e) ? document.querySelector(e) : e;
  }
  function Sn(e) {
    return di() ? (ua(e), true) : false;
  }
  var mr = typeof window < "u" && typeof document < "u";
  var yu = Object.prototype.toString;
  var wu = (e) => yu.call(e) === "[object Object]";
  var vr = () => {
  };
  function ku(...e) {
    if (e.length !== 1) return Fa(...e);
    const t = e[0];
    return typeof t == "function" ? Nt(ja(() => ({ get: t, set: vr }))) : se(t);
  }
  function Ml(e, t) {
    function n(...r) {
      return new Promise((s, i) => {
        Promise.resolve(e(() => t.apply(this, r), { fn: t, thisArg: this, args: r })).then(s).catch(i);
      });
    }
    return n;
  }
  var Pl = (e) => e();
  function xu(e, t = {}) {
    let n, r, s = vr;
    const i = (a) => {
      clearTimeout(a), s(), s = vr;
    };
    let l;
    return (a) => {
      const c = Te(e), u = Te(t.maxWait);
      return n && i(n), c <= 0 || u !== void 0 && u <= 0 ? (r && (i(r), r = null), Promise.resolve(a())) : new Promise((f, d) => {
        s = t.rejectOnCancel ? d : f, l = a, u && !r && (r = setTimeout(() => {
          n && i(n), r = null, f(l());
        }, u)), n = setTimeout(() => {
          r && i(r), r = null, f(a());
        }, c);
      });
    };
  }
  function _u(e = Pl, t = {}) {
    const { initialState: n = "active" } = t, r = ku(n === "active");
    function s() {
      r.value = false;
    }
    function i() {
      r.value = true;
    }
    const l = (...o) => {
      r.value && e(...o);
    };
    return { isActive: Nt(r), pause: s, resume: i, eventFilter: l };
  }
  function ps(e) {
    return Array.isArray(e) ? e : [e];
  }
  function Ol(e) {
    return cl();
  }
  function Cu(e, t = 200, n = {}) {
    return Ml(xu(t, n), e);
  }
  function Su(e, t, n = {}) {
    const { eventFilter: r = Pl, ...s } = n;
    return dt(e, Ml(r, t), s);
  }
  function $u(e, t, n = {}) {
    const { eventFilter: r, initialState: s = "active", ...i } = n, { eventFilter: l, pause: o, resume: a, isActive: c } = _u(r, { initialState: s });
    return { stop: Su(e, t, { ...i, eventFilter: l }), pause: o, resume: a, isActive: c };
  }
  function ds(e, t = true, n) {
    Ol() ? bn(e, n) : t ? e() : qt(e);
  }
  function Ru(e, t) {
    Ol() && Xr(e, t);
  }
  function Au(e, t = 1e3, n = {}) {
    const { immediate: r = true, immediateCallback: s = false } = n;
    let i = null;
    const l = Rt(false);
    function o() {
      i && (clearInterval(i), i = null);
    }
    function a() {
      l.value = false, o();
    }
    function c() {
      const u = Te(t);
      u <= 0 || (l.value = true, s && e(), o(), l.value && (i = setInterval(e, u)));
    }
    if (r && mr && c(), ve(t) || typeof t == "function") {
      const u = dt(t, () => {
        l.value && mr && c();
      });
      Sn(u);
    }
    return Sn(a), { isActive: Ia(l), pause: a, resume: c };
  }
  function Jt(e, t, n) {
    return dt(e, t, { ...n, immediate: true });
  }
  var br = mr ? window : void 0;
  var jl = mr ? window.document : void 0;
  function Eu(e) {
    var t;
    const n = Te(e);
    return (t = n == null ? void 0 : n.$el) != null ? t : n;
  }
  function Lt(...e) {
    const t = [], n = () => {
      t.forEach((o) => o()), t.length = 0;
    }, r = (o, a, c, u) => (o.addEventListener(a, c, u), () => o.removeEventListener(a, c, u)), s = ge(() => {
      const o = ps(Te(e[0])).filter((a) => a != null);
      return o.every((a) => typeof a != "string") ? o : void 0;
    }), i = Jt(() => {
      var o, a;
      return [(a = (o = s.value) == null ? void 0 : o.map((c) => Eu(c))) != null ? a : [br].filter((c) => c != null), ps(Te(s.value ? e[1] : e[0])), ps(K(s.value ? e[2] : e[1])), Te(s.value ? e[3] : e[2])];
    }, ([o, a, c, u]) => {
      if (n(), !(o != null && o.length) || !(a != null && a.length) || !(c != null && c.length)) return;
      const f = wu(u) ? { ...u } : u;
      t.push(...o.flatMap((d) => a.flatMap((m) => c.map((x) => r(d, m, x, f)))));
    }, { flush: "post" }), l = () => {
      i(), n();
    };
    return Sn(n), l;
  }
  function Tu(e, t = {}) {
    const { immediate: n = true, fpsLimit: r = void 0, window: s = br, once: i = false } = t, l = Rt(false), o = ge(() => r ? 1e3 / Te(r) : null);
    let a = 0, c = null;
    function u(m) {
      if (!l.value || !s) return;
      a || (a = m);
      const x = m - a;
      if (o.value && x < o.value) {
        c = s.requestAnimationFrame(u);
        return;
      }
      if (a = m, e({ delta: x, timestamp: m }), i) {
        l.value = false, c = null;
        return;
      }
      c = s.requestAnimationFrame(u);
    }
    function f() {
      !l.value && s && (l.value = true, a = 0, c = s.requestAnimationFrame(u));
    }
    function d() {
      l.value = false, c != null && s && (s.cancelAnimationFrame(c), c = null);
    }
    return n && f(), Sn(d), { isActive: Nt(l), pause: d, resume: f };
  }
  var yr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
  var wr = "__vueuse_ssr_handlers__";
  var Iu = Lu();
  function Lu() {
    return wr in yr || (yr[wr] = yr[wr] || {}), yr[wr];
  }
  function Mu(e, t) {
    return Iu[e] || t;
  }
  function Pu(e) {
    return e == null ? "any" : e instanceof Set ? "set" : e instanceof Map ? "map" : e instanceof Date ? "date" : typeof e == "boolean" ? "boolean" : typeof e == "string" ? "string" : typeof e == "object" ? "object" : Number.isNaN(e) ? "any" : "number";
  }
  var Ou = { boolean: { read: (e) => e === "true", write: (e) => String(e) }, object: { read: (e) => JSON.parse(e), write: (e) => JSON.stringify(e) }, number: { read: (e) => Number.parseFloat(e), write: (e) => String(e) }, any: { read: (e) => e, write: (e) => String(e) }, string: { read: (e) => e, write: (e) => String(e) }, map: { read: (e) => new Map(JSON.parse(e)), write: (e) => JSON.stringify(Array.from(e.entries())) }, set: { read: (e) => new Set(JSON.parse(e)), write: (e) => JSON.stringify(Array.from(e)) }, date: { read: (e) => new Date(e), write: (e) => e.toISOString() } };
  var zl = "vueuse-storage";
  function Yt(e, t, n, r = {}) {
    var s;
    const { flush: i = "pre", deep: l = true, listenToStorageChanges: o = true, writeDefaults: a = true, mergeDefaults: c = false, shallow: u, window: f = br, eventFilter: d, onError: m = (E) => {
      console.error(E);
    }, initOnMounted: x } = r, b = (u ? Rt : se)(typeof t == "function" ? t() : t), T = ge(() => Te(e));
    if (!n) try {
      n = Mu("getDefaultStorage", () => {
        var E;
        return (E = br) == null ? void 0 : E.localStorage;
      })();
    } catch (E) {
      m(E);
    }
    if (!n) return b;
    const w = Te(t), C = Pu(w), N = (s = r.serializer) != null ? s : Ou[C], { pause: I, resume: O } = $u(b, () => j(b.value), { flush: i, deep: l, eventFilter: d });
    dt(T, () => ae(), { flush: i }), f && o && ds(() => {
      n instanceof Storage ? Lt(f, "storage", ae, { passive: true }) : Lt(f, zl, Me), x && ae();
    }), x || ae();
    function G(E, B) {
      if (f) {
        const F = { key: T.value, oldValue: E, newValue: B, storageArea: n };
        f.dispatchEvent(n instanceof Storage ? new StorageEvent("storage", F) : new CustomEvent(zl, { detail: F }));
      }
    }
    function j(E) {
      try {
        const B = n.getItem(T.value);
        if (E == null) G(B, null), n.removeItem(T.value);
        else {
          const F = N.write(E);
          B !== F && (n.setItem(T.value, F), G(B, F));
        }
      } catch (B) {
        m(B);
      }
    }
    function oe(E) {
      const B = E ? E.newValue : n.getItem(T.value);
      if (B == null) return a && w != null && n.setItem(T.value, N.write(w)), w;
      if (!E && c) {
        const F = N.read(B);
        return typeof c == "function" ? c(F, w) : C === "object" && !Array.isArray(F) ? { ...w, ...F } : F;
      } else return typeof B != "string" ? B : N.read(B);
    }
    function ae(E) {
      if (!(E && E.storageArea !== n)) {
        if (E && E.key == null) {
          b.value = w;
          return;
        }
        if (!(E && E.key !== T.value)) {
          I();
          try {
            (E == null ? void 0 : E.newValue) !== N.write(b.value) && (b.value = oe(E));
          } catch (B) {
            m(B);
          } finally {
            E ? qt(O) : O();
          }
        }
      }
    }
    function Me(E) {
      ae(E.detail);
    }
    return b;
  }
  function ju(e = {}) {
    const { controls: t = false, interval: n = "requestAnimationFrame" } = e, r = se(/* @__PURE__ */ new Date()), s = () => r.value = /* @__PURE__ */ new Date(), i = n === "requestAnimationFrame" ? Tu(s, { immediate: true }) : Au(s, n, { immediate: true });
    return t ? { now: r, ...i } : r;
  }
  function zu(e, t = vr, n = {}) {
    const { immediate: r = true, manual: s = false, type: i = "text/javascript", async: l = true, crossOrigin: o, referrerPolicy: a, noModule: c, defer: u, document: f = jl, attrs: d = {} } = n, m = Rt(null);
    let x = null;
    const b = (C) => new Promise((N, I) => {
      const O = (ae) => (m.value = ae, N(ae), ae);
      if (!f) {
        N(false);
        return;
      }
      let G = false, j = f.querySelector(`script[src="${Te(e)}"]`);
      j ? j.hasAttribute("data-loaded") && O(j) : (j = f.createElement("script"), j.type = i, j.async = l, j.src = Te(e), u && (j.defer = u), o && (j.crossOrigin = o), c && (j.noModule = c), a && (j.referrerPolicy = a), Object.entries(d).forEach(([ae, Me]) => j == null ? void 0 : j.setAttribute(ae, Me)), G = true);
      const oe = { passive: true };
      Lt(j, "error", (ae) => I(ae), oe), Lt(j, "abort", (ae) => I(ae), oe), Lt(j, "load", () => {
        j.setAttribute("data-loaded", "true"), t(j), O(j);
      }, oe), G && (j = f.head.appendChild(j)), C || O(j);
    }), T = (C = true) => (x || (x = b(C)), x), w = () => {
      if (!f) return;
      x = null, m.value && (m.value = null);
      const C = f.querySelector(`script[src="${Te(e)}"]`);
      C && f.head.removeChild(C);
    };
    return r && !s && ds(T), s || Ru(w), { scriptTag: m, load: T, unload: w };
  }
  var Du = 0;
  function Fu(e, t = {}) {
    const n = Rt(false), { document: r = jl, immediate: s = true, manual: i = false, id: l = `vueuse_styletag_${++Du}` } = t, o = Rt(e);
    let a = () => {
    };
    const c = () => {
      if (!r) return;
      const f = r.getElementById(l) || r.createElement("style");
      f.isConnected || (f.id = l, t.media && (f.media = t.media), r.head.appendChild(f)), !n.value && (a = dt(o, (d) => {
        f.textContent = d;
      }, { immediate: true }), n.value = true);
    }, u = () => {
      !r || !n.value || (a(), r.head.removeChild(r.getElementById(l)), n.value = false);
    };
    return s && !i && ds(c), i || Sn(u), { id: l, css: o, unload: u, load: c, isLoaded: Nt(n) };
  }
  var Hu = "WALINE_EMOJI";
  var Dl = Yt(Hu, {});
  var Uu = (e) => !!/@[0-9]+\.[0-9]+\.[0-9]+/.test(e);
  var Nu = (e) => {
    const t = Uu(e);
    if (t) {
      const n = Dl.value[e];
      if (n) return Promise.resolve(n);
    }
    return fetch(`${e}/info.json`).then((n) => n.json()).then((n) => {
      const r = { folder: e, ...n };
      return t && (Dl.value[e] = r), r;
    });
  };
  var Fl = (e, t = "", n = "", r = "") => `${t ? `${t}/` : ""}${n}${e}${r ? `.${r}` : ""}`;
  var Bu = (e) => Promise.all(e ? e.map((t) => zt(t) ? Nu(ni(t)) : Promise.resolve(t)) : []).then((t) => {
    const n = { tabs: [], map: {} };
    return t.forEach((r) => {
      const { name: s, folder: i, icon: l, prefix: o = "", type: a, items: c } = r;
      n.tabs.push({ name: s, icon: Fl(l, i, o, a), items: c.map((u) => {
        const f = `${o}${u}`;
        return n.map[f] = Fl(u, i, o, a), f;
      }) });
    }), n;
  });
  var Hl = (e) => {
    e.name !== "AbortError" && console.error(e.message);
  };
  var gs = (e) => e instanceof HTMLElement ? e : zt(e) ? document.querySelector(e) : null;
  var Vu = (e) => e.type.includes("image");
  var Ul = (e) => {
    const t = Array.from(e).find(Vu);
    return t ? t.getAsFile() : null;
  };
  function ms() {
    return { async: false, breaks: false, extensions: null, gfm: true, hooks: null, pedantic: false, renderer: null, silent: false, tokenizer: null, walkTokens: null };
  }
  var Mt = ms();
  function Nl(e) {
    Mt = e;
  }
  var $n = { exec: () => null };
  function ne(e, t = "") {
    let n = typeof e == "string" ? e : e.source;
    const r = { replace: (s, i) => {
      let l = typeof i == "string" ? i : i.source;
      return l = l.replace(Re.caret, "$1"), n = n.replace(s, l), r;
    }, getRegex: () => new RegExp(n, t) };
    return r;
  }
  var Re = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] /, listReplaceTask: /^\[[ xX]\] +/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (e) => new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}#`), htmlBeginRegex: (e) => new RegExp(`^ {0,${Math.min(3, e - 1)}}<(?:[a-z].*>|!--)`, "i") };
  var Wu = /^(?:[ \t]*(?:\n|$))+/;
  var qu = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
  var Ku = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
  var Rn = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
  var Gu = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
  var vs = /(?:[*+-]|\d{1,9}[.)])/;
  var Bl = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
  var Vl = ne(Bl).replace(/bull/g, vs).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex();
  var Zu = ne(Bl).replace(/bull/g, vs).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex();
  var bs = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
  var Ju = /^[^\n]+/;
  var ys = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
  var Yu = ne(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", ys).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
  var Qu = ne(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, vs).getRegex();
  var kr = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
  var ws = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
  var Xu = ne("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", ws).replace("tag", kr).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
  var Wl = ne(bs).replace("hr", Rn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", kr).getRegex();
  var ef = ne(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Wl).getRegex();
  var ks = { blockquote: ef, code: qu, def: Yu, fences: Ku, heading: Gu, hr: Rn, html: Xu, lheading: Vl, list: Qu, newline: Wu, paragraph: Wl, table: $n, text: Ju };
  var ql = ne("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Rn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", kr).getRegex();
  var tf = { ...ks, lheading: Zu, table: ql, paragraph: ne(bs).replace("hr", Rn).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", ql).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", kr).getRegex() };
  var nf = { ...ks, html: ne(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", ws).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: $n, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: ne(bs).replace("hr", Rn).replace("heading", ` *#{1,6} *[^ ]`).replace("lheading", Vl).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() };
  var rf = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
  var sf = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
  var Kl = /^( {2,}|\\)\n(?!\s*$)/;
  var lf = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
  var xr = /[\p{P}\p{S}]/u;
  var xs = /[\s\p{P}\p{S}]/u;
  var Gl = /[^\s\p{P}\p{S}]/u;
  var of = ne(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, xs).getRegex();
  var Zl = /(?!~)[\p{P}\p{S}]/u;
  var af = /(?!~)[\s\p{P}\p{S}]/u;
  var cf = /(?:[^\s\p{P}\p{S}]|~)/u;
  var uf = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g;
  var Jl = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/;
  var ff = ne(Jl, "u").replace(/punct/g, xr).getRegex();
  var hf = ne(Jl, "u").replace(/punct/g, Zl).getRegex();
  var Yl = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
  var pf = ne(Yl, "gu").replace(/notPunctSpace/g, Gl).replace(/punctSpace/g, xs).replace(/punct/g, xr).getRegex();
  var df = ne(Yl, "gu").replace(/notPunctSpace/g, cf).replace(/punctSpace/g, af).replace(/punct/g, Zl).getRegex();
  var gf = ne("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, Gl).replace(/punctSpace/g, xs).replace(/punct/g, xr).getRegex();
  var mf = ne(/\\(punct)/, "gu").replace(/punct/g, xr).getRegex();
  var vf = ne(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
  var bf = ne(ws).replace("(?:-->|$)", "-->").getRegex();
  var yf = ne("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", bf).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
  var _r = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
  var wf = ne(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", _r).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
  var Ql = ne(/^!?\[(label)\]\[(ref)\]/).replace("label", _r).replace("ref", ys).getRegex();
  var Xl = ne(/^!?\[(ref)\](?:\[\])?/).replace("ref", ys).getRegex();
  var kf = ne("reflink|nolink(?!\\()", "g").replace("reflink", Ql).replace("nolink", Xl).getRegex();
  var _s = { _backpedal: $n, anyPunctuation: mf, autolink: vf, blockSkip: uf, br: Kl, code: sf, del: $n, emStrongLDelim: ff, emStrongRDelimAst: pf, emStrongRDelimUnd: gf, escape: rf, link: wf, nolink: Xl, punctuation: of, reflink: Ql, reflinkSearch: kf, tag: yf, text: lf, url: $n };
  var xf = { ..._s, link: ne(/^!?\[(label)\]\((.*?)\)/).replace("label", _r).getRegex(), reflink: ne(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", _r).getRegex() };
  var Cs = { ..._s, emStrongRDelimAst: df, emStrongLDelim: hf, url: ne(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/, text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/ };
  var _f = { ...Cs, br: ne(Kl).replace("{2,}", "*").getRegex(), text: ne(Cs.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() };
  var Cr = { normal: ks, gfm: tf, pedantic: nf };
  var An = { normal: _s, gfm: Cs, breaks: _f, pedantic: xf };
  var Cf = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  var eo = (e) => Cf[e];
  function Ye(e, t) {
    if (t) {
      if (Re.escapeTest.test(e)) return e.replace(Re.escapeReplace, eo);
    } else if (Re.escapeTestNoEncode.test(e)) return e.replace(Re.escapeReplaceNoEncode, eo);
    return e;
  }
  function to(e) {
    try {
      e = encodeURI(e).replace(Re.percentDecode, "%");
    } catch {
      return null;
    }
    return e;
  }
  function no(e, t) {
    var i;
    const n = e.replace(Re.findPipe, (l, o, a) => {
      let c = false, u = o;
      for (; --u >= 0 && a[u] === "\\"; ) c = !c;
      return c ? "|" : " |";
    }), r = n.split(Re.splitPipe);
    let s = 0;
    if (r[0].trim() || r.shift(), r.length > 0 && !((i = r.at(-1)) != null && i.trim()) && r.pop(), t) if (r.length > t) r.splice(t);
    else for (; r.length < t; ) r.push("");
    for (; s < r.length; s++) r[s] = r[s].trim().replace(Re.slashPipe, "|");
    return r;
  }
  function En(e, t, n) {
    const r = e.length;
    if (r === 0) return "";
    let s = 0;
    for (; s < r && e.charAt(r - s - 1) === t; ) s++;
    return e.slice(0, r - s);
  }
  function Sf(e, t) {
    if (e.indexOf(t[1]) === -1) return -1;
    let n = 0;
    for (let r = 0; r < e.length; r++) if (e[r] === "\\") r++;
    else if (e[r] === t[0]) n++;
    else if (e[r] === t[1] && (n--, n < 0)) return r;
    return n > 0 ? -2 : -1;
  }
  function ro(e, t, n, r, s) {
    const i = t.href, l = t.title || null, o = e[1].replace(s.other.outputLinkReplace, "$1");
    r.state.inLink = true;
    const a = { type: e[0].charAt(0) === "!" ? "image" : "link", raw: n, href: i, title: l, text: o, tokens: r.inlineTokens(o) };
    return r.state.inLink = false, a;
  }
  function $f(e, t, n) {
    const r = e.match(n.other.indentCodeCompensation);
    if (r === null) return t;
    const s = r[1];
    return t.split(` `).map((i) => {
      const l = i.match(n.other.beginningSpace);
      if (l === null) return i;
      const [o] = l;
      return o.length >= s.length ? i.slice(s.length) : i;
    }).join(` `);
  }
  var Sr = class {
    options;
    rules;
    lexer;
    constructor(t) {
      this.options = t || Mt;
    }
    space(t) {
      const n = this.rules.block.newline.exec(t);
      if (n && n[0].length > 0) return { type: "space", raw: n[0] };
    }
    code(t) {
      const n = this.rules.block.code.exec(t);
      if (n) {
        const r = n[0].replace(this.rules.other.codeRemoveIndent, "");
        return { type: "code", raw: n[0], codeBlockStyle: "indented", text: this.options.pedantic ? r : En(r, ` `) };
      }
    }
    fences(t) {
      const n = this.rules.block.fences.exec(t);
      if (n) {
        const r = n[0], s = $f(r, n[3] || "", this.rules);
        return { type: "code", raw: r, lang: n[2] ? n[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : n[2], text: s };
      }
    }
    heading(t) {
      const n = this.rules.block.heading.exec(t);
      if (n) {
        let r = n[2].trim();
        if (this.rules.other.endingHash.test(r)) {
          const s = En(r, "#");
          (this.options.pedantic || !s || this.rules.other.endingSpaceChar.test(s)) && (r = s.trim());
        }
        return { type: "heading", raw: n[0], depth: n[1].length, text: r, tokens: this.lexer.inline(r) };
      }
    }
    hr(t) {
      const n = this.rules.block.hr.exec(t);
      if (n) return { type: "hr", raw: En(n[0], ` `) };
    }
    blockquote(t) {
      const n = this.rules.block.blockquote.exec(t);
      if (n) {
        let r = En(n[0], ` `).split(` `), s = "", i = "";
        const l = [];
        for (; r.length > 0; ) {
          let o = false;
          const a = [];
          let c;
          for (c = 0; c < r.length; c++) if (this.rules.other.blockquoteStart.test(r[c])) a.push(r[c]), o = true;
          else if (!o) a.push(r[c]);
          else break;
          r = r.slice(c);
          const u = a.join(` `), f = u.replace(this.rules.other.blockquoteSetextReplace, ` $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
          s = s ? `${s} ${u}` : u, i = i ? `${i} ${f}` : f;
          const d = this.lexer.state.top;
          if (this.lexer.state.top = true, this.lexer.blockTokens(f, l, true), this.lexer.state.top = d, r.length === 0) break;
          const m = l.at(-1);
          if ((m == null ? void 0 : m.type) === "code") break;
          if ((m == null ? void 0 : m.type) === "blockquote") {
            const x = m, b = x.raw + ` ` + r.join(` `), T = this.blockquote(b);
            l[l.length - 1] = T, s = s.substring(0, s.length - x.raw.length) + T.raw, i = i.substring(0, i.length - x.text.length) + T.text;
            break;
          } else if ((m == null ? void 0 : m.type) === "list") {
            const x = m, b = x.raw + ` ` + r.join(` `), T = this.list(b);
            l[l.length - 1] = T, s = s.substring(0, s.length - m.raw.length) + T.raw, i = i.substring(0, i.length - x.raw.length) + T.raw, r = b.substring(l.at(-1).raw.length).split(` `);
            continue;
          }
        }
        return { type: "blockquote", raw: s, tokens: l, text: i };
      }
    }
    list(t) {
      let n = this.rules.block.list.exec(t);
      if (n) {
        let r = n[1].trim();
        const s = r.length > 1, i = { type: "list", raw: "", ordered: s, start: s ? +r.slice(0, -1) : "", loose: false, items: [] };
        r = s ? `\\d{1,9}\\${r.slice(-1)}` : `\\${r}`, this.options.pedantic && (r = s ? r : "[*+-]");
        const l = this.rules.other.listItemRegex(r);
        let o = false;
        for (; t; ) {
          let c = false, u = "", f = "";
          if (!(n = l.exec(t)) || this.rules.block.hr.test(t)) break;
          u = n[0], t = t.substring(u.length);
          let d = n[2].split(` `, 1)[0].replace(this.rules.other.listReplaceTabs, (C) => " ".repeat(3 * C.length)), m = t.split(` `, 1)[0], x = !d.trim(), b = 0;
          if (this.options.pedantic ? (b = 2, f = d.trimStart()) : x ? b = n[1].length + 1 : (b = n[2].search(this.rules.other.nonSpaceChar), b = b > 4 ? 1 : b, f = d.slice(b), b += n[1].length), x && this.rules.other.blankLine.test(m) && (u += m + ` `, t = t.substring(m.length + 1), c = true), !c) {
            const C = this.rules.other.nextBulletRegex(b), N = this.rules.other.hrRegex(b), I = this.rules.other.fencesBeginRegex(b), O = this.rules.other.headingBeginRegex(b), G = this.rules.other.htmlBeginRegex(b);
            for (; t; ) {
              const j = t.split(` `, 1)[0];
              let oe;
              if (m = j, this.options.pedantic ? (m = m.replace(this.rules.other.listReplaceNesting, "  "), oe = m) : oe = m.replace(this.rules.other.tabCharGlobal, "    "), I.test(m) || O.test(m) || G.test(m) || C.test(m) || N.test(m)) break;
              if (oe.search(this.rules.other.nonSpaceChar) >= b || !m.trim()) f += ` ` + oe.slice(b);
              else {
                if (x || d.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || I.test(d) || O.test(d) || N.test(d)) break;
                f += ` ` + m;
              }
              !x && !m.trim() && (x = true), u += j + ` `, t = t.substring(j.length + 1), d = oe.slice(b);
            }
          }
          i.loose || (o ? i.loose = true : this.rules.other.doubleBlankLine.test(u) && (o = true));
          let T = null, w;
          this.options.gfm && (T = this.rules.other.listIsTask.exec(f), T && (w = T[0] !== "[ ] ", f = f.replace(this.rules.other.listReplaceTask, ""))), i.items.push({ type: "list_item", raw: u, task: !!T, checked: w, loose: false, text: f, tokens: [] }), i.raw += u;
        }
        const a = i.items.at(-1);
        if (a) a.raw = a.raw.trimEnd(), a.text = a.text.trimEnd();
        else return;
        i.raw = i.raw.trimEnd();
        for (let c = 0; c < i.items.length; c++) if (this.lexer.state.top = false, i.items[c].tokens = this.lexer.blockTokens(i.items[c].text, []), !i.loose) {
          const u = i.items[c].tokens.filter((d) => d.type === "space"), f = u.length > 0 && u.some((d) => this.rules.other.anyLine.test(d.raw));
          i.loose = f;
        }
        if (i.loose) for (let c = 0; c < i.items.length; c++) i.items[c].loose = true;
        return i;
      }
    }
    html(t) {
      const n = this.rules.block.html.exec(t);
      if (n) return { type: "html", block: true, raw: n[0], pre: n[1] === "pre" || n[1] === "script" || n[1] === "style", text: n[0] };
    }
    def(t) {
      const n = this.rules.block.def.exec(t);
      if (n) {
        const r = n[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), s = n[2] ? n[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", i = n[3] ? n[3].substring(1, n[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : n[3];
        return { type: "def", tag: r, raw: n[0], href: s, title: i };
      }
    }
    table(t) {
      var o;
      const n = this.rules.block.table.exec(t);
      if (!n || !this.rules.other.tableDelimiter.test(n[2])) return;
      const r = no(n[1]), s = n[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = (o = n[3]) != null && o.trim() ? n[3].replace(this.rules.other.tableRowBlankLine, "").split(` `) : [], l = { type: "table", raw: n[0], header: [], align: [], rows: [] };
      if (r.length === s.length) {
        for (const a of s) this.rules.other.tableAlignRight.test(a) ? l.align.push("right") : this.rules.other.tableAlignCenter.test(a) ? l.align.push("center") : this.rules.other.tableAlignLeft.test(a) ? l.align.push("left") : l.align.push(null);
        for (let a = 0; a < r.length; a++) l.header.push({ text: r[a], tokens: this.lexer.inline(r[a]), header: true, align: l.align[a] });
        for (const a of i) l.rows.push(no(a, l.header.length).map((c, u) => ({ text: c, tokens: this.lexer.inline(c), header: false, align: l.align[u] })));
        return l;
      }
    }
    lheading(t) {
      const n = this.rules.block.lheading.exec(t);
      if (n) return { type: "heading", raw: n[0], depth: n[2].charAt(0) === "=" ? 1 : 2, text: n[1], tokens: this.lexer.inline(n[1]) };
    }
    paragraph(t) {
      const n = this.rules.block.paragraph.exec(t);
      if (n) {
        const r = n[1].charAt(n[1].length - 1) === ` ` ? n[1].slice(0, -1) : n[1];
        return { type: "paragraph", raw: n[0], text: r, tokens: this.lexer.inline(r) };
      }
    }
    text(t) {
      const n = this.rules.block.text.exec(t);
      if (n) return { type: "text", raw: n[0], text: n[0], tokens: this.lexer.inline(n[0]) };
    }
    escape(t) {
      const n = this.rules.inline.escape.exec(t);
      if (n) return { type: "escape", raw: n[0], text: n[1] };
    }
    tag(t) {
      const n = this.rules.inline.tag.exec(t);
      if (n) return !this.lexer.state.inLink && this.rules.other.startATag.test(n[0]) ? this.lexer.state.inLink = true : this.lexer.state.inLink && this.rules.other.endATag.test(n[0]) && (this.lexer.state.inLink = false), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(n[0]) ? this.lexer.state.inRawBlock = true : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(n[0]) && (this.lexer.state.inRawBlock = false), { type: "html", raw: n[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: false, text: n[0] };
    }
    link(t) {
      const n = this.rules.inline.link.exec(t);
      if (n) {
        const r = n[2].trim();
        if (!this.options.pedantic && this.rules.other.startAngleBracket.test(r)) {
          if (!this.rules.other.endAngleBracket.test(r)) return;
          const l = En(r.slice(0, -1), "\\");
          if ((r.length - l.length) % 2 === 0) return;
        } else {
          const l = Sf(n[2], "()");
          if (l === -2) return;
          if (l > -1) {
            const a = (n[0].indexOf("!") === 0 ? 5 : 4) + n[1].length + l;
            n[2] = n[2].substring(0, l), n[0] = n[0].substring(0, a).trim(), n[3] = "";
          }
        }
        let s = n[2], i = "";
        if (this.options.pedantic) {
          const l = this.rules.other.pedanticHrefTitle.exec(s);
          l && (s = l[1], i = l[3]);
        } else i = n[3] ? n[3].slice(1, -1) : "";
        return s = s.trim(), this.rules.other.startAngleBracket.test(s) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(r) ? s = s.slice(1) : s = s.slice(1, -1)), ro(n, { href: s && s.replace(this.rules.inline.anyPunctuation, "$1"), title: i && i.replace(this.rules.inline.anyPunctuation, "$1") }, n[0], this.lexer, this.rules);
      }
    }
    reflink(t, n) {
      let r;
      if ((r = this.rules.inline.reflink.exec(t)) || (r = this.rules.inline.nolink.exec(t))) {
        const s = (r[2] || r[1]).replace(this.rules.other.multipleSpaceGlobal, " "), i = n[s.toLowerCase()];
        if (!i) {
          const l = r[0].charAt(0);
          return { type: "text", raw: l, text: l };
        }
        return ro(r, i, r[0], this.lexer, this.rules);
      }
    }
    emStrong(t, n, r = "") {
      let s = this.rules.inline.emStrongLDelim.exec(t);
      if (!s || s[3] && r.match(this.rules.other.unicodeAlphaNumeric)) return;
      if (!(s[1] || s[2] || "") || !r || this.rules.inline.punctuation.exec(r)) {
        const l = [...s[0]].length - 1;
        let o, a, c = l, u = 0;
        const f = s[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
        for (f.lastIndex = 0, n = n.slice(-1 * t.length + l); (s = f.exec(n)) != null; ) {
          if (o = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !o) continue;
          if (a = [...o].length, s[3] || s[4]) {
            c += a;
            continue;
          } else if ((s[5] || s[6]) && l % 3 && !((l + a) % 3)) {
            u += a;
            continue;
          }
          if (c -= a, c > 0) continue;
          a = Math.min(a, a + c + u);
          const d = [...s[0]][0].length, m = t.slice(0, l + s.index + d + a);
          if (Math.min(l, a) % 2) {
            const b = m.slice(1, -1);
            return { type: "em", raw: m, text: b, tokens: this.lexer.inlineTokens(b) };
          }
          const x = m.slice(2, -2);
          return { type: "strong", raw: m, text: x, tokens: this.lexer.inlineTokens(x) };
        }
      }
    }
    codespan(t) {
      const n = this.rules.inline.code.exec(t);
      if (n) {
        let r = n[2].replace(this.rules.other.newLineCharGlobal, " ");
        const s = this.rules.other.nonSpaceChar.test(r), i = this.rules.other.startingSpaceChar.test(r) && this.rules.other.endingSpaceChar.test(r);
        return s && i && (r = r.substring(1, r.length - 1)), { type: "codespan", raw: n[0], text: r };
      }
    }
    br(t) {
      const n = this.rules.inline.br.exec(t);
      if (n) return { type: "br", raw: n[0] };
    }
    del(t) {
      const n = this.rules.inline.del.exec(t);
      if (n) return { type: "del", raw: n[0], text: n[2], tokens: this.lexer.inlineTokens(n[2]) };
    }
    autolink(t) {
      const n = this.rules.inline.autolink.exec(t);
      if (n) {
        let r, s;
        return n[2] === "@" ? (r = n[1], s = "mailto:" + r) : (r = n[1], s = r), { type: "link", raw: n[0], text: r, href: s, tokens: [{ type: "text", raw: r, text: r }] };
      }
    }
    url(t) {
      var r;
      let n;
      if (n = this.rules.inline.url.exec(t)) {
        let s, i;
        if (n[2] === "@") s = n[0], i = "mailto:" + s;
        else {
          let l;
          do
            l = n[0], n[0] = ((r = this.rules.inline._backpedal.exec(n[0])) == null ? void 0 : r[0]) ?? "";
          while (l !== n[0]);
          s = n[0], n[1] === "www." ? i = "http://" + n[0] : i = n[0];
        }
        return { type: "link", raw: n[0], text: s, href: i, tokens: [{ type: "text", raw: s, text: s }] };
      }
    }
    inlineText(t) {
      const n = this.rules.inline.text.exec(t);
      if (n) {
        const r = this.lexer.state.inRawBlock;
        return { type: "text", raw: n[0], text: n[0], escaped: r };
      }
    }
  };
  var Be = class _Be {
    tokens;
    options;
    state;
    tokenizer;
    inlineQueue;
    constructor(t) {
      this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = t || Mt, this.options.tokenizer = this.options.tokenizer || new Sr(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: false, inRawBlock: false, top: true };
      const n = { other: Re, block: Cr.normal, inline: An.normal };
      this.options.pedantic ? (n.block = Cr.pedantic, n.inline = An.pedantic) : this.options.gfm && (n.block = Cr.gfm, this.options.breaks ? n.inline = An.breaks : n.inline = An.gfm), this.tokenizer.rules = n;
    }
    static get rules() {
      return { block: Cr, inline: An };
    }
    static lex(t, n) {
      return new _Be(n).lex(t);
    }
    static lexInline(t, n) {
      return new _Be(n).inlineTokens(t);
    }
    lex(t) {
      t = t.replace(Re.carriageReturn, ` `), this.blockTokens(t, this.tokens);
      for (let n = 0; n < this.inlineQueue.length; n++) {
        const r = this.inlineQueue[n];
        this.inlineTokens(r.src, r.tokens);
      }
      return this.inlineQueue = [], this.tokens;
    }
    blockTokens(t, n = [], r = false) {
      var s, i, l;
      for (this.options.pedantic && (t = t.replace(Re.tabCharGlobal, "    ").replace(Re.spaceLine, "")); t; ) {
        let o;
        if ((i = (s = this.options.extensions) == null ? void 0 : s.block) != null && i.some((c) => (o = c.call({ lexer: this }, t, n)) ? (t = t.substring(o.raw.length), n.push(o), true) : false)) continue;
        if (o = this.tokenizer.space(t)) {
          t = t.substring(o.raw.length);
          const c = n.at(-1);
          o.raw.length === 1 && c !== void 0 ? c.raw += ` ` : n.push(o);
          continue;
        }
        if (o = this.tokenizer.code(t)) {
          t = t.substring(o.raw.length);
          const c = n.at(-1);
          (c == null ? void 0 : c.type) === "paragraph" || (c == null ? void 0 : c.type) === "text" ? (c.raw += ` ` + o.raw, c.text += ` ` + o.text, this.inlineQueue.at(-1).src = c.text) : n.push(o);
          continue;
        }
        if (o = this.tokenizer.fences(t)) {
          t = t.substring(o.raw.length), n.push(o);
          continue;
        }
        if (o = this.tokenizer.heading(t)) {
          t = t.substring(o.raw.length), n.push(o);
          continue;
        }
        if (o = this.tokenizer.hr(t)) {
          t = t.substring(o.raw.length), n.push(o);
          continue;
        }
        if (o = this.tokenizer.blockquote(t)) {
          t = t.substring(o.raw.length), n.push(o);
          continue;
        }
        if (o = this.tokenizer.list(t)) {
          t = t.substring(o.raw.length), n.push(o);
          continue;
        }
        if (o = this.tokenizer.html(t)) {
          t = t.substring(o.raw.length), n.push(o);
          continue;
        }
        if (o = this.tokenizer.def(t)) {
          t = t.substring(o.raw.length);
          const c = n.at(-1);
          (c == null ? void 0 : c.type) === "paragraph" || (c == null ? void 0 : c.type) === "text" ? (c.raw += ` ` + o.raw, c.text += ` ` + o.raw, this.inlineQueue.at(-1).src = c.text) : this.tokens.links[o.tag] || (this.tokens.links[o.tag] = { href: o.href, title: o.title });
          continue;
        }
        if (o = this.tokenizer.table(t)) {
          t = t.substring(o.raw.length), n.push(o);
          continue;
        }
        if (o = this.tokenizer.lheading(t)) {
          t = t.substring(o.raw.length), n.push(o);
          continue;
        }
        let a = t;
        if ((l = this.options.extensions) != null && l.startBlock) {
          let c = 1 / 0;
          const u = t.slice(1);
          let f;
          this.options.extensions.startBlock.forEach((d) => {
            f = d.call({ lexer: this }, u), typeof f == "number" && f >= 0 && (c = Math.min(c, f));
          }), c < 1 / 0 && c >= 0 && (a = t.substring(0, c + 1));
        }
        if (this.state.top && (o = this.tokenizer.paragraph(a))) {
          const c = n.at(-1);
          r && (c == null ? void 0 : c.type) === "paragraph" ? (c.raw += ` ` + o.raw, c.text += ` ` + o.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = c.text) : n.push(o), r = a.length !== t.length, t = t.substring(o.raw.length);
          continue;
        }
        if (o = this.tokenizer.text(t)) {
          t = t.substring(o.raw.length);
          const c = n.at(-1);
          (c == null ? void 0 : c.type) === "text" ? (c.raw += ` ` + o.raw, c.text += ` ` + o.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = c.text) : n.push(o);
          continue;
        }
        if (t) {
          const c = "Infinite loop on byte: " + t.charCodeAt(0);
          if (this.options.silent) {
            console.error(c);
            break;
          } else throw new Error(c);
        }
      }
      return this.state.top = true, n;
    }
    inline(t, n = []) {
      return this.inlineQueue.push({ src: t, tokens: n }), n;
    }
    inlineTokens(t, n = []) {
      var o, a, c;
      let r = t, s = null;
      if (this.tokens.links) {
        const u = Object.keys(this.tokens.links);
        if (u.length > 0) for (; (s = this.tokenizer.rules.inline.reflinkSearch.exec(r)) != null; ) u.includes(s[0].slice(s[0].lastIndexOf("[") + 1, -1)) && (r = r.slice(0, s.index) + "[" + "a".repeat(s[0].length - 2) + "]" + r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
      }
      for (; (s = this.tokenizer.rules.inline.anyPunctuation.exec(r)) != null; ) r = r.slice(0, s.index) + "++" + r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
      for (; (s = this.tokenizer.rules.inline.blockSkip.exec(r)) != null; ) r = r.slice(0, s.index) + "[" + "a".repeat(s[0].length - 2) + "]" + r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
      let i = false, l = "";
      for (; t; ) {
        i || (l = ""), i = false;
        let u;
        if ((a = (o = this.options.extensions) == null ? void 0 : o.inline) != null && a.some((d) => (u = d.call({ lexer: this }, t, n)) ? (t = t.substring(u.raw.length), n.push(u), true) : false)) continue;
        if (u = this.tokenizer.escape(t)) {
          t = t.substring(u.raw.length), n.push(u);
          continue;
        }
        if (u = this.tokenizer.tag(t)) {
          t = t.substring(u.raw.length), n.push(u);
          continue;
        }
        if (u = this.tokenizer.link(t)) {
          t = t.substring(u.raw.length), n.push(u);
          continue;
        }
        if (u = this.tokenizer.reflink(t, this.tokens.links)) {
          t = t.substring(u.raw.length);
          const d = n.at(-1);
          u.type === "text" && (d == null ? void 0 : d.type) === "text" ? (d.raw += u.raw, d.text += u.text) : n.push(u);
          continue;
        }
        if (u = this.tokenizer.emStrong(t, r, l)) {
          t = t.substring(u.raw.length), n.push(u);
          continue;
        }
        if (u = this.tokenizer.codespan(t)) {
          t = t.substring(u.raw.length), n.push(u);
          continue;
        }
        if (u = this.tokenizer.br(t)) {
          t = t.substring(u.raw.length), n.push(u);
          continue;
        }
        if (u = this.tokenizer.del(t)) {
          t = t.substring(u.raw.length), n.push(u);
          continue;
        }
        if (u = this.tokenizer.autolink(t)) {
          t = t.substring(u.raw.length), n.push(u);
          continue;
        }
        if (!this.state.inLink && (u = this.tokenizer.url(t))) {
          t = t.substring(u.raw.length), n.push(u);
          continue;
        }
        let f = t;
        if ((c = this.options.extensions) != null && c.startInline) {
          let d = 1 / 0;
          const m = t.slice(1);
          let x;
          this.options.extensions.startInline.forEach((b) => {
            x = b.call({ lexer: this }, m), typeof x == "number" && x >= 0 && (d = Math.min(d, x));
          }), d < 1 / 0 && d >= 0 && (f = t.substring(0, d + 1));
        }
        if (u = this.tokenizer.inlineText(f)) {
          t = t.substring(u.raw.length), u.raw.slice(-1) !== "_" && (l = u.raw.slice(-1)), i = true;
          const d = n.at(-1);
          (d == null ? void 0 : d.type) === "text" ? (d.raw += u.raw, d.text += u.text) : n.push(u);
          continue;
        }
        if (t) {
          const d = "Infinite loop on byte: " + t.charCodeAt(0);
          if (this.options.silent) {
            console.error(d);
            break;
          } else throw new Error(d);
        }
      }
      return n;
    }
  };
  var $r = class {
    options;
    parser;
    constructor(t) {
      this.options = t || Mt;
    }
    space(t) {
      return "";
    }
    code({ text: t, lang: n, escaped: r }) {
      var l;
      const s = (l = (n || "").match(Re.notSpaceStart)) == null ? void 0 : l[0], i = t.replace(Re.endingNewline, "") + ` `;
      return s ? '<pre><code class="language-' + Ye(s) + '">' + (r ? i : Ye(i, true)) + `</code></pre> ` : "<pre><code>" + (r ? i : Ye(i, true)) + `</code></pre> `;
    }
    blockquote({ tokens: t }) {
      return `<blockquote> ${this.parser.parse(t)}</blockquote> `;
    }
    html({ text: t }) {
      return t;
    }
    heading({ tokens: t, depth: n }) {
      return `<h${n}>${this.parser.parseInline(t)}</h${n}> `;
    }
    hr(t) {
      return `<hr> `;
    }
    list(t) {
      const n = t.ordered, r = t.start;
      let s = "";
      for (let o = 0; o < t.items.length; o++) {
        const a = t.items[o];
        s += this.listitem(a);
      }
      const i = n ? "ol" : "ul", l = n && r !== 1 ? ' start="' + r + '"' : "";
      return "<" + i + l + `> ` + s + "</" + i + `> `;
    }
    listitem(t) {
      var r;
      let n = "";
      if (t.task) {
        const s = this.checkbox({ checked: !!t.checked });
        t.loose ? ((r = t.tokens[0]) == null ? void 0 : r.type) === "paragraph" ? (t.tokens[0].text = s + " " + t.tokens[0].text, t.tokens[0].tokens && t.tokens[0].tokens.length > 0 && t.tokens[0].tokens[0].type === "text" && (t.tokens[0].tokens[0].text = s + " " + Ye(t.tokens[0].tokens[0].text), t.tokens[0].tokens[0].escaped = true)) : t.tokens.unshift({ type: "text", raw: s + " ", text: s + " ", escaped: true }) : n += s + " ";
      }
      return n += this.parser.parse(t.tokens, !!t.loose), `<li>${n}</li> `;
    }
    checkbox({ checked: t }) {
      return "<input " + (t ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
    }
    paragraph({ tokens: t }) {
      return `<p>${this.parser.parseInline(t)}</p> `;
    }
    table(t) {
      let n = "", r = "";
      for (let i = 0; i < t.header.length; i++) r += this.tablecell(t.header[i]);
      n += this.tablerow({ text: r });
      let s = "";
      for (let i = 0; i < t.rows.length; i++) {
        const l = t.rows[i];
        r = "";
        for (let o = 0; o < l.length; o++) r += this.tablecell(l[o]);
        s += this.tablerow({ text: r });
      }
      return s && (s = `<tbody>${s}</tbody>`), `<table> <thead> ` + n + `</thead> ` + s + `</table> `;
    }
    tablerow({ text: t }) {
      return `<tr> ${t}</tr> `;
    }
    tablecell(t) {
      const n = this.parser.parseInline(t.tokens), r = t.header ? "th" : "td";
      return (t.align ? `<${r} align="${t.align}">` : `<${r}>`) + n + `</${r}> `;
    }
    strong({ tokens: t }) {
      return `<strong>${this.parser.parseInline(t)}</strong>`;
    }
    em({ tokens: t }) {
      return `<em>${this.parser.parseInline(t)}</em>`;
    }
    codespan({ text: t }) {
      return `<code>${Ye(t, true)}</code>`;
    }
    br(t) {
      return "<br>";
    }
    del({ tokens: t }) {
      return `<del>${this.parser.parseInline(t)}</del>`;
    }
    link({ href: t, title: n, tokens: r }) {
      const s = this.parser.parseInline(r), i = to(t);
      if (i === null) return s;
      t = i;
      let l = '<a href="' + t + '"';
      return n && (l += ' title="' + Ye(n) + '"'), l += ">" + s + "</a>", l;
    }
    image({ href: t, title: n, text: r, tokens: s }) {
      s && (r = this.parser.parseInline(s, this.parser.textRenderer));
      const i = to(t);
      if (i === null) return Ye(r);
      t = i;
      let l = `<img src="${t}" alt="${r}"`;
      return n && (l += ` title="${Ye(n)}"`), l += ">", l;
    }
    text(t) {
      return "tokens" in t && t.tokens ? this.parser.parseInline(t.tokens) : "escaped" in t && t.escaped ? t.text : Ye(t.text);
    }
  };
  var Ss = class {
    strong({ text: t }) {
      return t;
    }
    em({ text: t }) {
      return t;
    }
    codespan({ text: t }) {
      return t;
    }
    del({ text: t }) {
      return t;
    }
    html({ text: t }) {
      return t;
    }
    text({ text: t }) {
      return t;
    }
    link({ text: t }) {
      return "" + t;
    }
    image({ text: t }) {
      return "" + t;
    }
    br() {
      return "";
    }
  };
  var Ve = class _Ve {
    options;
    renderer;
    textRenderer;
    constructor(t) {
      this.options = t || Mt, this.options.renderer = this.options.renderer || new $r(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Ss();
    }
    static parse(t, n) {
      return new _Ve(n).parse(t);
    }
    static parseInline(t, n) {
      return new _Ve(n).parseInline(t);
    }
    parse(t, n = true) {
      var s, i;
      let r = "";
      for (let l = 0; l < t.length; l++) {
        const o = t[l];
        if ((i = (s = this.options.extensions) == null ? void 0 : s.renderers) != null && i[o.type]) {
          const c = o, u = this.options.extensions.renderers[c.type].call({ parser: this }, c);
          if (u !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(c.type)) {
            r += u || "";
            continue;
          }
        }
        const a = o;
        switch (a.type) {
          case "space": {
            r += this.renderer.space(a);
            continue;
          }
          case "hr": {
            r += this.renderer.hr(a);
            continue;
          }
          case "heading": {
            r += this.renderer.heading(a);
            continue;
          }
          case "code": {
            r += this.renderer.code(a);
            continue;
          }
          case "table": {
            r += this.renderer.table(a);
            continue;
          }
          case "blockquote": {
            r += this.renderer.blockquote(a);
            continue;
          }
          case "list": {
            r += this.renderer.list(a);
            continue;
          }
          case "html": {
            r += this.renderer.html(a);
            continue;
          }
          case "paragraph": {
            r += this.renderer.paragraph(a);
            continue;
          }
          case "text": {
            let c = a, u = this.renderer.text(c);
            for (; l + 1 < t.length && t[l + 1].type === "text"; ) c = t[++l], u += ` ` + this.renderer.text(c);
            n ? r += this.renderer.paragraph({ type: "paragraph", raw: u, text: u, tokens: [{ type: "text", raw: u, text: u, escaped: true }] }) : r += u;
            continue;
          }
          default: {
            const c = 'Token with "' + a.type + '" type was not found.';
            if (this.options.silent) return console.error(c), "";
            throw new Error(c);
          }
        }
      }
      return r;
    }
    parseInline(t, n = this.renderer) {
      var s, i;
      let r = "";
      for (let l = 0; l < t.length; l++) {
        const o = t[l];
        if ((i = (s = this.options.extensions) == null ? void 0 : s.renderers) != null && i[o.type]) {
          const c = this.options.extensions.renderers[o.type].call({ parser: this }, o);
          if (c !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(o.type)) {
            r += c || "";
            continue;
          }
        }
        const a = o;
        switch (a.type) {
          case "escape": {
            r += n.text(a);
            break;
          }
          case "html": {
            r += n.html(a);
            break;
          }
          case "link": {
            r += n.link(a);
            break;
          }
          case "image": {
            r += n.image(a);
            break;
          }
          case "strong": {
            r += n.strong(a);
            break;
          }
          case "em": {
            r += n.em(a);
            break;
          }
          case "codespan": {
            r += n.codespan(a);
            break;
          }
          case "br": {
            r += n.br(a);
            break;
          }
          case "del": {
            r += n.del(a);
            break;
          }
          case "text": {
            r += n.text(a);
            break;
          }
          default: {
            const c = 'Token with "' + a.type + '" type was not found.';
            if (this.options.silent) return console.error(c), "";
            throw new Error(c);
          }
        }
      }
      return r;
    }
  };
  var Tn = class {
    options;
    block;
    constructor(t) {
      this.options = t || Mt;
    }
    preprocess(t) {
      return t;
    }
    postprocess(t) {
      return t;
    }
    processAllTokens(t) {
      return t;
    }
    provideLexer() {
      return this.block ? Be.lex : Be.lexInline;
    }
    provideParser() {
      return this.block ? Ve.parse : Ve.parseInline;
    }
  };
  Ts(Tn, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"]));
  var so = class {
    defaults = ms();
    options = this.setOptions;
    parse = this.parseMarkdown(true);
    parseInline = this.parseMarkdown(false);
    Parser = Ve;
    Renderer = $r;
    TextRenderer = Ss;
    Lexer = Be;
    Tokenizer = Sr;
    Hooks = Tn;
    constructor(...t) {
      this.use(...t);
    }
    walkTokens(t, n) {
      var s, i;
      let r = [];
      for (const l of t) switch (r = r.concat(n.call(this, l)), l.type) {
        case "table": {
          const o = l;
          for (const a of o.header) r = r.concat(this.walkTokens(a.tokens, n));
          for (const a of o.rows) for (const c of a) r = r.concat(this.walkTokens(c.tokens, n));
          break;
        }
        case "list": {
          const o = l;
          r = r.concat(this.walkTokens(o.items, n));
          break;
        }
        default: {
          const o = l;
          (i = (s = this.defaults.extensions) == null ? void 0 : s.childTokens) != null && i[o.type] ? this.defaults.extensions.childTokens[o.type].forEach((a) => {
            const c = o[a].flat(1 / 0);
            r = r.concat(this.walkTokens(c, n));
          }) : o.tokens && (r = r.concat(this.walkTokens(o.tokens, n)));
        }
      }
      return r;
    }
    use(...t) {
      const n = this.defaults.extensions || { renderers: {}, childTokens: {} };
      return t.forEach((r) => {
        const s = { ...r };
        if (s.async = this.defaults.async || s.async || false, r.extensions && (r.extensions.forEach((i) => {
          if (!i.name) throw new Error("extension name required");
          if ("renderer" in i) {
            const l = n.renderers[i.name];
            l ? n.renderers[i.name] = function(...o) {
              let a = i.renderer.apply(this, o);
              return a === false && (a = l.apply(this, o)), a;
            } : n.renderers[i.name] = i.renderer;
          }
          if ("tokenizer" in i) {
            if (!i.level || i.level !== "block" && i.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
            const l = n[i.level];
            l ? l.unshift(i.tokenizer) : n[i.level] = [i.tokenizer], i.start && (i.level === "block" ? n.startBlock ? n.startBlock.push(i.start) : n.startBlock = [i.start] : i.level === "inline" && (n.startInline ? n.startInline.push(i.start) : n.startInline = [i.start]));
          }
          "childTokens" in i && i.childTokens && (n.childTokens[i.name] = i.childTokens);
        }), s.extensions = n), r.renderer) {
          const i = this.defaults.renderer || new $r(this.defaults);
          for (const l in r.renderer) {
            if (!(l in i)) throw new Error(`renderer '${l}' does not exist`);
            if (["options", "parser"].includes(l)) continue;
            const o = l, a = r.renderer[o], c = i[o];
            i[o] = (...u) => {
              let f = a.apply(i, u);
              return f === false && (f = c.apply(i, u)), f || "";
            };
          }
          s.renderer = i;
        }
        if (r.tokenizer) {
          const i = this.defaults.tokenizer || new Sr(this.defaults);
          for (const l in r.tokenizer) {
            if (!(l in i)) throw new Error(`tokenizer '${l}' does not exist`);
            if (["options", "rules", "lexer"].includes(l)) continue;
            const o = l, a = r.tokenizer[o], c = i[o];
            i[o] = (...u) => {
              let f = a.apply(i, u);
              return f === false && (f = c.apply(i, u)), f;
            };
          }
          s.tokenizer = i;
        }
        if (r.hooks) {
          const i = this.defaults.hooks || new Tn();
          for (const l in r.hooks) {
            if (!(l in i)) throw new Error(`hook '${l}' does not exist`);
            if (["options", "block"].includes(l)) continue;
            const o = l, a = r.hooks[o], c = i[o];
            Tn.passThroughHooks.has(l) ? i[o] = (u) => {
              if (this.defaults.async) return Promise.resolve(a.call(i, u)).then((d) => c.call(i, d));
              const f = a.call(i, u);
              return c.call(i, f);
            } : i[o] = (...u) => {
              let f = a.apply(i, u);
              return f === false && (f = c.apply(i, u)), f;
            };
          }
          s.hooks = i;
        }
        if (r.walkTokens) {
          const i = this.defaults.walkTokens, l = r.walkTokens;
          s.walkTokens = function(o) {
            let a = [];
            return a.push(l.call(this, o)), i && (a = a.concat(i.call(this, o))), a;
          };
        }
        this.defaults = { ...this.defaults, ...s };
      }), this;
    }
    setOptions(t) {
      return this.defaults = { ...this.defaults, ...t }, this;
    }
    lexer(t, n) {
      return Be.lex(t, n ?? this.defaults);
    }
    parser(t, n) {
      return Ve.parse(t, n ?? this.defaults);
    }
    parseMarkdown(t) {
      return (r, s) => {
        const i = { ...s }, l = { ...this.defaults, ...i }, o = this.onError(!!l.silent, !!l.async);
        if (this.defaults.async === true && i.async === false) return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
        if (typeof r > "u" || r === null) return o(new Error("marked(): input parameter is undefined or null"));
        if (typeof r != "string") return o(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(r) + ", string expected"));
        l.hooks && (l.hooks.options = l, l.hooks.block = t);
        const a = l.hooks ? l.hooks.provideLexer() : t ? Be.lex : Be.lexInline, c = l.hooks ? l.hooks.provideParser() : t ? Ve.parse : Ve.parseInline;
        if (l.async) return Promise.resolve(l.hooks ? l.hooks.preprocess(r) : r).then((u) => a(u, l)).then((u) => l.hooks ? l.hooks.processAllTokens(u) : u).then((u) => l.walkTokens ? Promise.all(this.walkTokens(u, l.walkTokens)).then(() => u) : u).then((u) => c(u, l)).then((u) => l.hooks ? l.hooks.postprocess(u) : u).catch(o);
        try {
          l.hooks && (r = l.hooks.preprocess(r));
          let u = a(r, l);
          l.hooks && (u = l.hooks.processAllTokens(u)), l.walkTokens && this.walkTokens(u, l.walkTokens);
          let f = c(u, l);
          return l.hooks && (f = l.hooks.postprocess(f)), f;
        } catch (u) {
          return o(u);
        }
      };
    }
    onError(t, n) {
      return (r) => {
        if (r.message += ` Please report this to https://github.com/markedjs/marked.`, t) {
          const s = "<p>An error occurred:</p><pre>" + Ye(r.message + "", true) + "</pre>";
          return n ? Promise.resolve(s) : s;
        }
        if (n) return Promise.reject(r);
        throw r;
      };
    }
  };
  var Pt = new so();
  function pe(e, t) {
    return Pt.parse(e, t);
  }
  pe.options = pe.setOptions = function(e) {
    return Pt.setOptions(e), pe.defaults = Pt.defaults, Nl(pe.defaults), pe;
  }, pe.getDefaults = ms, pe.defaults = Mt, pe.use = function(...e) {
    return Pt.use(...e), pe.defaults = Pt.defaults, Nl(pe.defaults), pe;
  }, pe.walkTokens = function(e, t) {
    return Pt.walkTokens(e, t);
  }, pe.parseInline = Pt.parseInline, pe.Parser = Ve, pe.parser = Ve.parse, pe.Renderer = $r, pe.TextRenderer = Ss, pe.Lexer = Be, pe.lexer = Be.lex, pe.Tokenizer = Sr, pe.Hooks = Tn, pe.parse = pe;
  function Rf(e) {
    if (typeof e == "function" && (e = { highlight: e }), !e || typeof e.highlight != "function") throw new Error("Must provide highlight function");
    return typeof e.langPrefix != "string" && (e.langPrefix = "language-"), typeof e.emptyLangClass != "string" && (e.emptyLangClass = ""), { async: !!e.async, walkTokens(t) {
      if (t.type !== "code") return;
      const n = io(t.lang);
      if (e.async) return Promise.resolve(e.highlight(t.text, n, t.lang || "")).then(lo(t));
      const r = e.highlight(t.text, n, t.lang || "");
      if (r instanceof Promise) throw new Error("markedHighlight is not set to async but the highlight function is async. Set the async option to true on markedHighlight to await the async highlight function.");
      lo(t)(r);
    }, useNewRenderer: true, renderer: { code(t, n, r) {
      typeof t == "object" && (r = t.escaped, n = t.lang, t = t.text);
      const s = io(n), i = s ? e.langPrefix + uo(s) : e.emptyLangClass, l = i ? ` class="${i}"` : "";
      return t = t.replace(/\n$/, ""), `<pre><code${l}>${r ? t : uo(t, true)} </code></pre>`;
    } } };
  }
  function io(e) {
    return (e || "").match(/\S*/)[0];
  }
  function lo(e) {
    return (t) => {
      typeof t == "string" && t !== e.text && (e.escaped = true, e.text = t);
    };
  }
  var oo = /[&<>"']/;
  var Af = new RegExp(oo.source, "g");
  var ao = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
  var Ef = new RegExp(ao.source, "g");
  var Tf = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  var co = (e) => Tf[e];
  function uo(e, t) {
    if (t) {
      if (oo.test(e)) return e.replace(Af, co);
    } else if (ao.test(e)) return e.replace(Ef, co);
    return e;
  }
  var If = /\$.*?\$/;
  var Lf = /^\$(.*?)\$/;
  var Mf = /^(?:\s{0,3})\$\$((?:[^\n]|\n[^\n])+?)\n{0,1}\$\$/;
  var Pf = (e) => [{ name: "blockMath", level: "block", tokenizer(t) {
    const n = Mf.exec(t);
    if (n !== null) return { type: "html", raw: n[0], text: e(true, n[1]) };
  } }, { name: "inlineMath", level: "inline", start(t) {
    const n = t.search(If);
    return n !== -1 ? n : t.length;
  }, tokenizer(t) {
    const n = Lf.exec(t);
    if (n !== null) return { type: "html", raw: n[0], text: e(false, n[1]) };
  } }];
  var fo = (e = "", t = {}) => e.replace(/:(.+?):/g, (n, r) => t[r] ? `<img class="wl-emoji" src="${t[r]}" alt="${r}">` : n);
  var Of = (e, { emojiMap: t, highlighter: n, texRenderer: r }) => {
    const s = new so();
    if (s.setOptions({ breaks: true }), n && s.use(Rf({ highlight: n })), r) {
      const i = Pf(r);
      s.use({ extensions: i });
    }
    return s.parse(fo(e, t));
  };
  var $s = (e) => {
    const { path: t } = e.dataset;
    return t != null && t.length ? t : null;
  };
  var jf = (e) => e.match(/[\w\d\s,.\u00C0-\u024F\u0400-\u04FF]+/giu);
  var zf = (e) => e.match(/[\u4E00-\u9FD5]/gu);
  var Df = (e) => {
    var t, n;
    return (((t = jf(e)) == null ? void 0 : t.reduce((r, s) => r + (["", ",", "."].includes(s.trim()) ? 0 : s.trim().split(/\s+/u).length), 0)) ?? 0) + (((n = zf(e)) == null ? void 0 : n.length) ?? 0);
  };
  var Ff = async () => {
    const { userAgentData: e } = navigator;
    let t = navigator.userAgent;
    if (!e || e.platform !== "Windows") return t;
    const { platformVersion: n } = await e.getHighEntropyValues(["platformVersion"]);
    return n && parseInt(n.split(".")[0]) >= 13 && (t = t.replace("Windows NT 10.0", "Windows NT 11.0")), t;
  };
  var ho = ({ serverURL: e, path: t = window.location.pathname, selector: n = ".waline-comment-count", lang: r = navigator.language }) => {
    const s = new AbortController(), i = document.querySelectorAll(n);
    return i.length && Os({ serverURL: Hn(e), paths: Array.from(i).map((l) => ti($s(l) ?? t)), lang: r, signal: s.signal }).then((l) => {
      i.forEach((o, a) => {
        o.innerText = l[a].toString();
      });
    }).catch(Hl), s.abort.bind(s);
  };
  var po = ({ size: e }) => te("svg", { class: "wl-close-icon", viewBox: "0 0 1024 1024", width: e, height: e }, [te("path", { d: "M697.173 85.333h-369.92c-144.64 0-241.92 101.547-241.92 252.587v348.587c0 150.613 97.28 252.16 241.92 252.16h369.92c144.64 0 241.494-101.547 241.494-252.16V337.92c0-151.04-96.854-252.587-241.494-252.587z", fill: "currentColor" }), te("path", { d: "m640.683 587.52-75.947-75.861 75.904-75.862a37.29 37.29 0 0 0 0-52.778 37.205 37.205 0 0 0-52.779 0l-75.946 75.818-75.862-75.946a37.419 37.419 0 0 0-52.821 0 37.419 37.419 0 0 0 0 52.821l75.947 75.947-75.776 75.733a37.29 37.29 0 1 0 52.778 52.821l75.776-75.776 75.947 75.947a37.376 37.376 0 0 0 52.779-52.821z", fill: "#888" })]);
  var Hf = () => te("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, te("path", { d: "m341.013 394.667 27.755 393.45h271.83l27.733-393.45h64.106l-28.01 397.952a64 64 0 0 1-63.83 59.498H368.768a64 64 0 0 1-63.83-59.52l-28.053-397.93h64.128zm139.307 19.818v298.667h-64V414.485h64zm117.013 0v298.667h-64V414.485h64zM181.333 288h640v64h-640v-64zm453.483-106.667v64h-256v-64h256z", fill: "red" }));
  var Uf = () => te("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, te("path", { d: "M563.2 463.3 677 540c1.7 1.2 3.7 1.8 5.8 1.8.7 0 1.4-.1 2-.2 2.7-.5 5.1-2.1 6.6-4.4l25.3-37.8c1.5-2.3 2.1-5.1 1.6-7.8s-2.1-5.1-4.4-6.6l-73.6-49.1 73.6-49.1c2.3-1.5 3.9-3.9 4.4-6.6.5-2.7 0-5.5-1.6-7.8l-25.3-37.8a10.1 10.1 0 0 0-6.6-4.4c-.7-.1-1.3-.2-2-.2-2.1 0-4.1.6-5.8 1.8l-113.8 76.6c-9.2 6.2-14.7 16.4-14.7 27.5.1 11 5.5 21.3 14.7 27.4zM387 348.8h-45.5c-5.7 0-10.4 4.7-10.4 10.4v153.3c0 5.7 4.7 10.4 10.4 10.4H387c5.7 0 10.4-4.7 10.4-10.4V359.2c0-5.7-4.7-10.4-10.4-10.4zm333.8 241.3-41-20a10.3 10.3 0 0 0-8.1-.5c-2.6.9-4.8 2.9-5.9 5.4-30.1 64.9-93.1 109.1-164.4 115.2-5.7.5-9.9 5.5-9.5 11.2l3.9 45.5c.5 5.3 5 9.5 10.3 9.5h.9c94.8-8 178.5-66.5 218.6-152.7 2.4-5 .3-11.2-4.8-13.6zm186-186.1c-11.9-42-30.5-81.4-55.2-117.1-24.1-34.9-53.5-65.6-87.5-91.2-33.9-25.6-71.5-45.5-111.6-59.2-41.2-14-84.1-21.1-127.8-21.1h-1.2c-75.4 0-148.8 21.4-212.5 61.7-63.7 40.3-114.3 97.6-146.5 165.8-32.2 68.1-44.3 143.6-35.1 218.4 9.3 74.8 39.4 145 87.3 203.3.1.2.3.3.4.5l36.2 38.4c1.1 1.2 2.5 2.1 3.9 2.6 73.3 66.7 168.2 103.5 267.5 103.5 73.3 0 145.2-20.3 207.7-58.7 37.3-22.9 70.3-51.5 98.1-85 27.1-32.7 48.7-69.5 64.2-109.1 15.5-39.7 24.4-81.3 26.6-123.8 2.4-43.6-2.5-87-14.5-129zm-60.5 181.1c-8.3 37-22.8 72-43 104-19.7 31.1-44.3 58.6-73.1 81.7-28.8 23.1-61 41-95.7 53.4-35.6 12.7-72.9 19.1-110.9 19.1-82.6 0-161.7-30.6-222.8-86.2l-34.1-35.8c-23.9-29.3-42.4-62.2-55.1-97.7-12.4-34.7-18.8-71-19.2-107.9-.4-36.9 5.4-73.3 17.1-108.2 12-35.8 30-69.2 53.4-99.1 31.7-40.4 71.1-72 117.2-94.1 44.5-21.3 94-32.6 143.4-32.6 49.3 0 97 10.8 141.8 32 34.3 16.3 65.3 38.1 92 64.8 26.1 26 47.5 56 63.6 89.2 16.2 33.2 26.6 68.5 31 105.1 4.6 37.5 2.7 75.3-5.6 112.3z", fill: "currentColor" }));
  var Nf = () => te("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, [te("path", { d: "M784 112H240c-88 0-160 72-160 160v480c0 88 72 160 160 160h544c88 0 160-72 160-160V272c0-88-72-160-160-160zm96 640c0 52.8-43.2 96-96 96H240c-52.8 0-96-43.2-96-96V272c0-52.8 43.2-96 96-96h544c52.8 0 96 43.2 96 96v480z", fill: "currentColor" }), te("path", { d: "M352 480c52.8 0 96-43.2 96-96s-43.2-96-96-96-96 43.2-96 96 43.2 96 96 96zm0-128c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32zm462.4 379.2-3.2-3.2-177.6-177.6c-25.6-25.6-65.6-25.6-91.2 0l-80 80-36.8-36.8c-25.6-25.6-65.6-25.6-91.2 0L200 728c-4.8 6.4-8 14.4-8 24 0 17.6 14.4 32 32 32 9.6 0 16-3.2 22.4-9.6L380.8 640l134.4 134.4c6.4 6.4 14.4 9.6 24 9.6 17.6 0 32-14.4 32-32 0-9.6-4.8-17.6-9.6-24l-52.8-52.8 80-80L769.6 776c6.4 4.8 12.8 8 20.8 8 17.6 0 32-14.4 32-32 0-8-3.2-16-8-20.8z", fill: "currentColor" })]);
  var Bf = ({ active: e = false }) => te("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, [te("path", { d: `M850.654 323.804c-11.042-25.625-26.862-48.532-46.885-68.225-20.022-19.61-43.258-34.936-69.213-45.73-26.78-11.124-55.124-16.727-84.375-16.727-40.622 0-80.256 11.123-114.698 32.135A214.79 214.79 0 0 0 512 241.819a214.79 214.79 0 0 0-23.483-16.562c-34.442-21.012-74.076-32.135-114.698-32.135-29.25 0-57.595 5.603-84.375 16.727-25.872 10.711-49.19 26.12-69.213 45.73-20.105 19.693-35.843 42.6-46.885 68.225-11.453 26.615-17.303 54.877-17.303 83.963 0 27.439 5.603 56.03 16.727 85.117 9.31 24.307 22.659 49.52 39.715 74.981 27.027 40.293 64.188 82.316 110.33 124.915 76.465 70.615 152.189 119.394 155.402 121.371l19.528 12.525c8.652 5.52 19.776 5.52 28.427 0l19.529-12.525c3.213-2.06 78.854-50.756 155.401-121.371 46.143-42.6 83.304-84.622 110.33-124.915 17.057-25.46 30.487-50.674 39.716-74.981 11.124-29.087 16.727-57.678 16.727-85.117.082-29.086-5.768-57.348-17.221-83.963z${e ? "" : "M512 761.5S218.665 573.55 218.665 407.767c0-83.963 69.461-152.023 155.154-152.023 60.233 0 112.473 33.618 138.181 82.727 25.708-49.109 77.948-82.727 138.18-82.727 85.694 0 155.155 68.06 155.155 152.023C805.335 573.551 512 761.5 512 761.5z"}`, fill: e ? "red" : "currentColor" })]);
  var Vf = () => te("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, [te("path", { d: "M710.816 654.301c70.323-96.639 61.084-230.578-23.705-314.843-46.098-46.098-107.183-71.109-172.28-71.109-65.008 0-126.092 25.444-172.28 71.109-45.227 46.098-70.756 107.183-70.756 172.106 0 64.923 25.444 126.007 71.194 172.106 46.099 46.098 107.184 71.109 172.28 71.109 51.414 0 100.648-16.212 142.824-47.404l126.53 126.006c7.058 7.06 16.297 10.979 26.406 10.979 10.105 0 19.343-3.919 26.402-10.979 14.467-14.467 14.467-38.172 0-52.723L710.816 654.301zm-315.107-23.265c-65.88-65.88-65.88-172.54 0-238.42 32.069-32.07 74.245-49.149 119.471-49.149 45.227 0 87.407 17.603 119.472 49.149 65.88 65.879 65.88 172.539 0 238.42-63.612 63.178-175.242 63.178-238.943 0zm0 0", fill: "currentColor" }), te("path", { d: "M703.319 121.603H321.03c-109.8 0-199.469 89.146-199.469 199.38v382.034c0 109.796 89.236 199.38 199.469 199.38h207.397c20.653 0 37.384-16.645 37.384-37.299 0-20.649-16.731-37.296-37.384-37.296H321.03c-68.582 0-124.352-55.77-124.352-124.267V321.421c0-68.496 55.77-124.267 124.352-124.267h382.289c68.582 0 124.352 55.771 124.352 124.267V524.72c0 20.654 16.736 37.299 37.385 37.299 20.654 0 37.384-16.645 37.384-37.299V320.549c-.085-109.8-89.321-198.946-199.121-198.946zm0 0", fill: "currentColor" })]);
  var Wf = () => te("svg", { width: "16", height: "16", ariaHidden: "true" }, te("path", { d: "M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z", fill: "currentColor" }));
  var qf = () => te("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, te("path", { d: "M810.667 213.333a64 64 0 0 1 64 64V704a64 64 0 0 1-64 64H478.336l-146.645 96.107a21.333 21.333 0 0 1-33.024-17.856V768h-85.334a64 64 0 0 1-64-64V277.333a64 64 0 0 1 64-64h597.334zm0 64H213.333V704h149.334v63.296L459.243 704h351.424V277.333zm-271.36 213.334v64h-176.64v-64h176.64zm122.026-128v64H362.667v-64h298.666z", fill: "currentColor" }));
  var Kf = () => te("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, te("path", { d: "M813.039 318.772L480.53 651.278H360.718V531.463L693.227 198.961C697.904 194.284 704.027 192 710.157 192C716.302 192 722.436 194.284 727.114 198.961L813.039 284.88C817.72 289.561 820 295.684 820 301.825C820 307.95 817.72 314.093 813.039 318.772ZM710.172 261.888L420.624 551.431V591.376H460.561L750.109 301.825L710.172 261.888ZM490.517 291.845H240.906V771.09H720.156V521.479C720.156 504.947 733.559 491.529 750.109 491.529C766.653 491.529 780.063 504.947 780.063 521.479V791.059C780.063 813.118 762.18 831 740.125 831H220.937C198.882 831 181 813.118 181 791.059V271.872C181 249.817 198.882 231.935 220.937 231.935H490.517C507.06 231.935 520.47 245.352 520.47 261.888C520.47 278.424 507.06 291.845 490.517 291.845Z", fill: "currentColor" }));
  var Gf = () => te("svg", { class: "verified-icon", viewBox: "0 0 1024 1024", width: "14", height: "14" }, te("path", { d: "m894.4 461.56-54.4-63.2c-10.4-12-18.8-34.4-18.8-50.4v-68c0-42.4-34.8-77.2-77.2-77.2h-68c-15.6 0-38.4-8.4-50.4-18.8l-63.2-54.4c-27.6-23.6-72.8-23.6-100.8 0l-62.8 54.8c-12 10-34.8 18.4-50.4 18.4h-69.2c-42.4 0-77.2 34.8-77.2 77.2v68.4c0 15.6-8.4 38-18.4 50l-54 63.6c-23.2 27.6-23.2 72.4 0 100l54 63.6c10 12 18.4 34.4 18.4 50v68.4c0 42.4 34.8 77.2 77.2 77.2h69.2c15.6 0 38.4 8.4 50.4 18.8l63.2 54.4c27.6 23.6 72.8 23.6 100.8 0l63.2-54.4c12-10.4 34.4-18.8 50.4-18.8h68c42.4 0 77.2-34.8 77.2-77.2v-68c0-15.6 8.4-38.4 18.8-50.4l54.4-63.2c23.2-27.6 23.2-73.2-.4-100.8zm-216-25.2-193.2 193.2a30 30 0 0 1-42.4 0l-96.8-96.8a30.16 30.16 0 0 1 0-42.4c11.6-11.6 30.8-11.6 42.4 0l75.6 75.6 172-172c11.6-11.6 30.8-11.6 42.4 0 11.6 11.6 11.6 30.8 0 42.4z", fill: "#27ae60" }));
  var In = ({ size: e = 100 }) => te("svg", { width: e, height: e, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid" }, te("circle", { cx: 50, cy: 50, fill: "none", stroke: "currentColor", strokeWidth: "4", r: "40", "stroke-dasharray": "85 30" }, te("animateTransform", { attributeName: "transform", type: "rotate", repeatCount: "indefinite", dur: "1s", values: "0 50 50;360 50 50", keyTimes: "0;1" })));
  var Zf = () => te("svg", { width: 24, height: 24, fill: "currentcolor", viewBox: "0 0 24 24" }, [te("path", { style: "transform: translateY(0.5px)", d: "M18.968 10.5H15.968V11.484H17.984V12.984H15.968V15H14.468V9H18.968V10.5V10.5ZM8.984 9C9.26533 9 9.49967 9.09367 9.687 9.281C9.87433 9.46833 9.968 9.70267 9.968 9.984V10.5H6.499V13.5H8.468V12H9.968V14.016C9.968 14.2973 9.87433 14.5317 9.687 14.719C9.49967 14.9063 9.26533 15 8.984 15H5.984C5.70267 15 5.46833 14.9063 5.281 14.719C5.09367 14.5317 5 14.2973 5 14.016V9.985C5 9.70367 5.09367 9.46933 5.281 9.282C5.46833 9.09467 5.70267 9.001 5.984 9.001H8.984V9ZM11.468 9H12.968V15H11.468V9V9Z" }), te("path", { d: "M18.5 3H5.75C3.6875 3 2 4.6875 2 6.75V18C2 20.0625 3.6875 21.75 5.75 21.75H18.5C20.5625 21.75 22.25 20.0625 22.25 18V6.75C22.25 4.6875 20.5625 3 18.5 3ZM20.75 18C20.75 19.2375 19.7375 20.25 18.5 20.25H5.75C4.5125 20.25 3.5 19.2375 3.5 18V6.75C3.5 5.5125 4.5125 4.5 5.75 4.5H18.5C19.7375 4.5 20.75 5.5125 20.75 6.75V18Z" })]);
  var Jf = () => Yt("WALINE_USER_META", { nick: "", mail: "", link: "" });
  var Yf = () => Yt("WALINE_COMMENT_BOX_EDITOR", "");
  var Qf = "WALINE_LIKE";
  var Xf = Yt(Qf, []);
  var go = () => Xf;
  var eh = "WALINE_REACTION";
  var th = Yt(eh, {});
  var nh = () => th;
  var Rs = {};
  var at = {};
  var ct = {};
  var mo;
  function vo() {
    if (mo) return ct;
    mo = 1;
    var e = ct && ct.__awaiter || function(r, s, i, l) {
      function o(a) {
        return a instanceof i ? a : new i(function(c) {
          c(a);
        });
      }
      return new (i || (i = Promise))(function(a, c) {
        function u(m) {
          try {
            d(l.next(m));
          } catch (x) {
            c(x);
          }
        }
        function f(m) {
          try {
            d(l.throw(m));
          } catch (x) {
            c(x);
          }
        }
        function d(m) {
          m.done ? a(m.value) : o(m.value).then(u, f);
        }
        d((l = l.apply(r, s || [])).next());
      });
    }, t = ct && ct.__generator || function(r, s) {
      var i = { label: 0, sent: function() {
        if (a[0] & 1) throw a[1];
        return a[1];
      }, trys: [], ops: [] }, l, o, a, c;
      return c = { next: u(0), throw: u(1), return: u(2) }, typeof Symbol == "function" && (c[Symbol.iterator] = function() {
        return this;
      }), c;
      function u(d) {
        return function(m) {
          return f([d, m]);
        };
      }
      function f(d) {
        if (l) throw new TypeError("Generator is already executing.");
        for (; c && (c = 0, d[0] && (i = 0)), i; ) try {
          if (l = 1, o && (a = d[0] & 2 ? o.return : d[0] ? o.throw || ((a = o.return) && a.call(o), 0) : o.next) && !(a = a.call(o, d[1])).done) return a;
          switch (o = 0, a && (d = [d[0] & 2, a.value]), d[0]) {
            case 0:
            case 1:
              a = d;
              break;
            case 4:
              return i.label++, { value: d[1], done: false };
            case 5:
              i.label++, o = d[1], d = [0];
              continue;
            case 7:
              d = i.ops.pop(), i.trys.pop();
              continue;
            default:
              if (a = i.trys, !(a = a.length > 0 && a[a.length - 1]) && (d[0] === 6 || d[0] === 2)) {
                i = 0;
                continue;
              }
              if (d[0] === 3 && (!a || d[1] > a[0] && d[1] < a[3])) {
                i.label = d[1];
                break;
              }
              if (d[0] === 6 && i.label < a[1]) {
                i.label = a[1], a = d;
                break;
              }
              if (a && i.label < a[2]) {
                i.label = a[2], i.ops.push(d);
                break;
              }
              a[2] && i.ops.pop(), i.trys.pop();
              continue;
          }
          d = s.call(r, i);
        } catch (m) {
          d = [6, m], o = 0;
        } finally {
          l = a = 0;
        }
        if (d[0] & 5) throw d[1];
        return { value: d[0] ? d[1] : void 0, done: true };
      }
    };
    Object.defineProperty(ct, "__esModule", { value: true }), ct.ReCaptchaInstance = void 0;
    var n = function() {
      function r(s, i, l) {
        this.siteKey = s, this.recaptchaID = i, this.recaptcha = l, this.styleContainer = null;
      }
      return r.prototype.execute = function(s) {
        return e(this, void 0, void 0, function() {
          var i;
          return t(this, function(l) {
            switch (l.label) {
              case 0:
                return this.recaptcha.enterprise ? [4, this.recaptcha.enterprise.execute(this.recaptchaID, { action: s })] : [3, 2];
              case 1:
                return i = l.sent(), [3, 4];
              case 2:
                return [4, this.recaptcha.execute(this.recaptchaID, { action: s })];
              case 3:
                i = l.sent(), l.label = 4;
              case 4:
                return [2, i];
            }
          });
        });
      }, r.prototype.getSiteKey = function() {
        return this.siteKey;
      }, r.prototype.hideBadge = function() {
        this.styleContainer === null && (this.styleContainer = document.createElement("style"), this.styleContainer.innerHTML = ".grecaptcha-badge{visibility:hidden !important;}", document.head.appendChild(this.styleContainer));
      }, r.prototype.showBadge = function() {
        this.styleContainer !== null && (document.head.removeChild(this.styleContainer), this.styleContainer = null);
      }, r;
    }();
    return ct.ReCaptchaInstance = n, ct;
  }
  var bo;
  function rh() {
    if (bo) return at;
    bo = 1;
    var e = at && at.__assign || function() {
      return e = Object.assign || function(s) {
        for (var i, l = 1, o = arguments.length; l < o; l++) {
          i = arguments[l];
          for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (s[a] = i[a]);
        }
        return s;
      }, e.apply(this, arguments);
    };
    Object.defineProperty(at, "__esModule", { value: true }), at.getInstance = at.load = void 0;
    var t = vo(), n;
    (function(s) {
      s[s.NOT_LOADED = 0] = "NOT_LOADED", s[s.LOADING = 1] = "LOADING", s[s.LOADED = 2] = "LOADED";
    })(n || (n = {}));
    var r = function() {
      function s() {
      }
      return s.load = function(i, l) {
        if (l === void 0 && (l = {}), typeof document > "u") return Promise.reject(new Error("This is a library for the browser!"));
        if (s.getLoadingState() === n.LOADED) return s.instance.getSiteKey() === i ? Promise.resolve(s.instance) : Promise.reject(new Error("reCAPTCHA already loaded with different site key!"));
        if (s.getLoadingState() === n.LOADING) return i !== s.instanceSiteKey ? Promise.reject(new Error("reCAPTCHA already loaded with different site key!")) : new Promise(function(a, c) {
          s.successfulLoadingConsumers.push(function(u) {
            return a(u);
          }), s.errorLoadingRunnable.push(function(u) {
            return c(u);
          });
        });
        s.instanceSiteKey = i, s.setLoadingState(n.LOADING);
        var o = new s();
        return new Promise(function(a, c) {
          o.loadScript(i, l.useRecaptchaNet || false, l.useEnterprise || false, l.renderParameters ? l.renderParameters : {}, l.customUrl).then(function() {
            s.setLoadingState(n.LOADED);
            var u = o.doExplicitRender(grecaptcha, i, l.explicitRenderParameters ? l.explicitRenderParameters : {}, l.useEnterprise || false), f = new t.ReCaptchaInstance(i, u, grecaptcha);
            s.successfulLoadingConsumers.forEach(function(d) {
              return d(f);
            }), s.successfulLoadingConsumers = [], l.autoHideBadge && f.hideBadge(), s.instance = f, a(f);
          }).catch(function(u) {
            s.errorLoadingRunnable.forEach(function(f) {
              return f(u);
            }), s.errorLoadingRunnable = [], c(u);
          });
        });
      }, s.getInstance = function() {
        return s.instance;
      }, s.setLoadingState = function(i) {
        s.loadingState = i;
      }, s.getLoadingState = function() {
        return s.loadingState === null ? n.NOT_LOADED : s.loadingState;
      }, s.prototype.loadScript = function(i, l, o, a, c) {
        var u = this;
        l === void 0 && (l = false), o === void 0 && (o = false), a === void 0 && (a = {}), c === void 0 && (c = "");
        var f = document.createElement("script");
        f.setAttribute("recaptcha-v3-script", ""), f.setAttribute("async", ""), f.setAttribute("defer", "");
        var d = "https://www.google.com/recaptcha/api.js";
        l ? o ? d = "https://recaptcha.net/recaptcha/enterprise.js" : d = "https://recaptcha.net/recaptcha/api.js" : o && (d = "https://www.google.com/recaptcha/enterprise.js"), c && (d = c), a.render && (a.render = void 0);
        var m = this.buildQueryString(a);
        return f.src = d + "?render=explicit" + m, new Promise(function(x, b) {
          f.addEventListener("load", u.waitForScriptToLoad(function() {
            x(f);
          }, o), false), f.onerror = function(T) {
            s.setLoadingState(n.NOT_LOADED), b(T);
          }, document.head.appendChild(f);
        });
      }, s.prototype.buildQueryString = function(i) {
        var l = Object.keys(i);
        return l.length < 1 ? "" : "&" + Object.keys(i).filter(function(o) {
          return !!i[o];
        }).map(function(o) {
          return o + "=" + i[o];
        }).join("&");
      }, s.prototype.waitForScriptToLoad = function(i, l) {
        var o = this;
        return function() {
          window.grecaptcha === void 0 ? setTimeout(function() {
            o.waitForScriptToLoad(i, l);
          }, s.SCRIPT_LOAD_DELAY) : l ? window.grecaptcha.enterprise.ready(function() {
            i();
          }) : window.grecaptcha.ready(function() {
            i();
          });
        };
      }, s.prototype.doExplicitRender = function(i, l, o, a) {
        var c = e({ sitekey: l }, o);
        return o.container ? a ? i.enterprise.render(o.container, c) : i.render(o.container, c) : a ? i.enterprise.render(c) : i.render(c);
      }, s.loadingState = null, s.instance = null, s.instanceSiteKey = null, s.successfulLoadingConsumers = [], s.errorLoadingRunnable = [], s.SCRIPT_LOAD_DELAY = 25, s;
    }();
    return at.load = r.load, at.getInstance = r.getInstance, at;
  }
  var yo;
  function sh() {
    return yo || (yo = 1, function(e) {
      Object.defineProperty(e, "__esModule", { value: true }), e.ReCaptchaInstance = e.getInstance = e.load = void 0;
      var t = rh();
      Object.defineProperty(e, "load", { enumerable: true, get: function() {
        return t.load;
      } }), Object.defineProperty(e, "getInstance", { enumerable: true, get: function() {
        return t.getInstance;
      } });
      var n = vo();
      Object.defineProperty(e, "ReCaptchaInstance", { enumerable: true, get: function() {
        return n.ReCaptchaInstance;
      } });
    }(Rs)), Rs;
  }
  var ih = sh();
  var wo = {};
  var lh = (e) => {
    const t = wo[e] ?? (wo[e] = ih.load(e, { useRecaptchaNet: true, autoHideBadge: true }));
    return { execute: (n) => t.then((r) => r.execute(n)) };
  };
  var oh = (e) => ({ execute: async (t) => {
    const { load: n } = zu("https://challenges.cloudflare.com/turnstile/v0/api.js", void 0, { async: false });
    await n();
    const r = window.turnstile;
    return new Promise((s) => {
      r == null || r.ready(() => {
        r.render(".wl-captcha-container", { sitekey: e, action: t, size: "compact", callback: s });
      });
    });
  } });
  var ah = "WALINE_USER";
  var ch = Yt(ah, {});
  var Rr = () => ch;
  var uh = { key: 0, class: "wl-reaction" };
  var fh = ["textContent"];
  var hh = { class: "wl-reaction-list" };
  var ph = ["onClick"];
  var dh = { class: "wl-reaction-img" };
  var gh = ["src", "alt"];
  var mh = ["textContent"];
  var vh = ["textContent"];
  var bh = /* @__PURE__ */ mn({ __name: "ArticleReaction", setup(e) {
    const t = nh(), n = lr(Fn), r = se(-1), s = se([]), i = ge(() => n.value.locale), l = ge(() => {
      const { reaction: f } = n.value;
      return f != null && f.length ? f : null;
    }), o = ge(() => {
      var f;
      const { path: d } = n.value;
      return ((f = l.value) == null ? void 0 : f.map((m, x) => ({ icon: m, desc: i.value[`reaction${x}`], active: t.value[d] === x }))) ?? null;
    });
    let a;
    const c = async () => {
      const { serverURL: f, lang: d, path: m } = n.value;
      if (!l.value) return;
      const x = new AbortController();
      a = x.abort.bind(x);
      const [b] = await Er({ serverURL: f, lang: d, paths: [m], type: l.value.map((T, w) => `reaction${w}`), signal: x.signal });
      s.value = l.value.map((T, w) => b[`reaction${w}`]);
    }, u = async (f) => {
      if (r.value !== -1) return;
      const { serverURL: d, lang: m, path: x } = n.value, b = t.value[x];
      r.value = f, b !== void 0 && (await zn({ serverURL: d, lang: m, path: x, type: `reaction${b}`, action: "desc" }), s.value[b] = Math.max(s.value[b] - 1, 0)), b !== f && (await zn({ serverURL: d, lang: m, path: x, type: `reaction${f}` }), s.value[f] = (s.value[f] || 0) + 1), b === f ? delete t.value[x] : t.value[x] = f, r.value = -1;
    };
    return bn(() => {
      Jt(() => [n.value.serverURL, n.value.path], () => c());
    }), Xr(() => {
      a == null || a();
    }), (f, d) => o.value ? (L(), P("div", uh, [D("div", { class: "wl-reaction-title", textContent: Y(i.value.reactionTitle) }, null, 8, fh), D("ul", hh, [(L(true), P(fe, null, Fe(o.value, ({ active: m, icon: x, desc: b }, T) => (L(), P("li", { key: T, class: me(["wl-reaction-item", { active: m }]), onClick: (w) => u(T) }, [D("div", dh, [D("img", { src: x, alt: b }, null, 8, gh), r.value === T ? (L(), st(K(In), { key: 0, class: "wl-reaction-loading" })) : (L(), P("div", { key: 1, class: "wl-reaction-votes", textContent: Y(s.value[T] || 0) }, null, 8, mh))]), D("div", { class: "wl-reaction-text", textContent: Y(b) }, null, 8, vh)], 10, ph))), 128))])])) : J("v-if", true);
  } });
  var Ln = /* @__PURE__ */ new Map();
  function yh(e) {
    var t = Ln.get(e);
    t && t.destroy();
  }
  function wh(e) {
    var t = Ln.get(e);
    t && t.update();
  }
  var Mn = null;
  typeof window > "u" ? ((Mn = function(e) {
    return e;
  }).destroy = function(e) {
    return e;
  }, Mn.update = function(e) {
    return e;
  }) : ((Mn = function(e, t) {
    return e && Array.prototype.forEach.call(e.length ? e : [e], function(n) {
      return function(r) {
        if (r && r.nodeName && r.nodeName === "TEXTAREA" && !Ln.has(r)) {
          var s, i = null, l = window.getComputedStyle(r), o = (s = r.value, function() {
            c({ testForHeightReduction: s === "" || !r.value.startsWith(s), restoreTextAlign: null }), s = r.value;
          }), a = function(f) {
            r.removeEventListener("autosize:destroy", a), r.removeEventListener("autosize:update", u), r.removeEventListener("input", o), window.removeEventListener("resize", u), Object.keys(f).forEach(function(d) {
              return r.style[d] = f[d];
            }), Ln.delete(r);
          }.bind(r, { height: r.style.height, resize: r.style.resize, textAlign: r.style.textAlign, overflowY: r.style.overflowY, overflowX: r.style.overflowX, wordWrap: r.style.wordWrap });
          r.addEventListener("autosize:destroy", a), r.addEventListener("autosize:update", u), r.addEventListener("input", o), window.addEventListener("resize", u), r.style.overflowX = "hidden", r.style.wordWrap = "break-word", Ln.set(r, { destroy: a, update: u }), u();
        }
        function c(f) {
          var d, m, x = f.restoreTextAlign, b = x === void 0 ? null : x, T = f.testForHeightReduction, w = T === void 0 || T, C = l.overflowY;
          if (r.scrollHeight !== 0 && (l.resize === "vertical" ? r.style.resize = "none" : l.resize === "both" && (r.style.resize = "horizontal"), w && (d = function(I) {
            for (var O = []; I && I.parentNode && I.parentNode instanceof Element; ) I.parentNode.scrollTop && O.push([I.parentNode, I.parentNode.scrollTop]), I = I.parentNode;
            return function() {
              return O.forEach(function(G) {
                var j = G[0], oe = G[1];
                j.style.scrollBehavior = "auto", j.scrollTop = oe, j.style.scrollBehavior = null;
              });
            };
          }(r), r.style.height = ""), m = l.boxSizing === "content-box" ? r.scrollHeight - (parseFloat(l.paddingTop) + parseFloat(l.paddingBottom)) : r.scrollHeight + parseFloat(l.borderTopWidth) + parseFloat(l.borderBottomWidth), l.maxHeight !== "none" && m > parseFloat(l.maxHeight) ? (l.overflowY === "hidden" && (r.style.overflow = "scroll"), m = parseFloat(l.maxHeight)) : l.overflowY !== "hidden" && (r.style.overflow = "hidden"), r.style.height = m + "px", b && (r.style.textAlign = b), d && d(), i !== m && (r.dispatchEvent(new Event("autosize:resized", { bubbles: true })), i = m), C !== l.overflow && !b)) {
            var N = l.textAlign;
            l.overflow === "hidden" && (r.style.textAlign = N === "start" ? "end" : "start"), c({ restoreTextAlign: N, testForHeightReduction: true });
          }
        }
        function u() {
          c({ testForHeightReduction: true, restoreTextAlign: null });
        }
      }(n);
    }), e;
  }).destroy = function(e) {
    return e && Array.prototype.forEach.call(e.length ? e : [e], yh), e;
  }, Mn.update = function(e) {
    return e && Array.prototype.forEach.call(e.length ? e : [e], wh), e;
  });
  var ko = Mn;
  var kh = ["data-index"];
  var xh = ["src", "title", "onClick"];
  var _h = /* @__PURE__ */ mn({ __name: "ImageWall", props: { items: { default: () => [] }, columnWidth: { default: 300 }, gap: { default: 0 } }, emits: ["insert"], setup(e) {
    const t = e;
    let n = null;
    const r = pt("wall"), s = se({}), i = se([]), l = () => {
      const f = Math.floor((r.value.getBoundingClientRect().width + t.gap) / (t.columnWidth + t.gap));
      return f > 0 ? f : 1;
    }, o = (f) => new Array(f).fill(null).map(() => []), a = async (f) => {
      var d;
      if (f >= t.items.length) return;
      await qt();
      const m = Array.from(((d = r.value) == null ? void 0 : d.children) ?? []).reduce((x, b) => b.getBoundingClientRect().height < x.getBoundingClientRect().height ? b : x);
      i.value[Number(m.dataset.index)].push(f), await a(f + 1);
    }, c = async (f = false) => {
      if (i.value.length === l() && !f) return;
      i.value = o(l());
      const d = window.scrollY;
      await a(0), window.scrollTo({ top: d });
    }, u = (f) => {
      s.value[f.target.src] = true;
    };
    return bn(() => {
      c(true), n = new ResizeObserver(() => {
        c();
      }), n.observe(r.value), dt(() => [t.items], () => {
        s.value = {}, c(true);
      }), dt(() => [t.columnWidth, t.gap], () => {
        c();
      });
    }), ec(() => {
      n.unobserve(r.value);
    }), (f, d) => (L(), P("div", { ref_key: "wall", ref: r, class: "wl-gallery", style: on({ gap: `${f.gap}px` }) }, [(L(true), P(fe, null, Fe(i.value, (m, x) => (L(), P("div", { key: x, class: "wl-gallery-column", "data-index": x, style: on({ gap: `${f.gap}px` }) }, [(L(true), P(fe, null, Fe(m, (b) => (L(), P(fe, { key: b }, [s.value[f.items[b].src] ? J("v-if", true) : (L(), st(K(In), { key: 0, size: 36, style: { margin: "20px auto" } })), D("img", { class: "wl-gallery-item", src: f.items[b].src, title: f.items[b].title, loading: "lazy", onLoad: u, onClick: (T) => f.$emit("insert", `![](${f.items[b].src})`) }, null, 40, xh)], 64))), 128))], 12, kh))), 128))], 4));
  } });
  var Ch = { key: 0, class: "wl-login-info" };
  var Sh = { class: "wl-avatar" };
  var $h = ["title"];
  var Rh = ["title"];
  var Ah = ["src"];
  var Eh = ["title", "textContent"];
  var Th = { class: "wl-panel" };
  var Ih = ["for", "textContent"];
  var Lh = ["id", "onUpdate:modelValue", "name", "type"];
  var Mh = ["placeholder"];
  var Ph = { class: "wl-preview" };
  var Oh = ["innerHTML"];
  var jh = { class: "wl-footer" };
  var zh = { class: "wl-actions" };
  var Dh = { href: "https://guides.github.com/features/mastering-markdown/", title: "Markdown Guide", "aria-label": "Markdown is supported", class: "wl-action", target: "_blank", rel: "noopener noreferrer" };
  var Fh = ["title"];
  var Hh = ["title"];
  var Uh = ["title", "aria-label"];
  var Nh = ["title"];
  var Bh = { class: "wl-info" };
  var Vh = { class: "wl-text-number" };
  var Wh = { key: 0 };
  var qh = ["textContent"];
  var Kh = ["textContent"];
  var Gh = ["disabled"];
  var Zh = ["placeholder"];
  var Jh = { key: 1, class: "wl-loading" };
  var Yh = { key: 0, class: "wl-tab-wrapper" };
  var Qh = ["title", "onClick"];
  var Xh = ["src", "alt"];
  var ep = { key: 0, class: "wl-tabs" };
  var tp = ["onClick"];
  var np = ["src", "alt", "title"];
  var rp = ["title"];
  var xo = /* @__PURE__ */ mn({ __name: "CommentBox", props: { edit: {}, rootId: {}, replyId: {}, replyUser: {} }, emits: ["log", "cancelEdit", "cancelReply", "submit"], setup(e, { emit: t }) {
    const n = e, r = t, s = lr(Fn), i = Yf(), l = Jf(), o = Rr(), a = se({}), c = pt("textarea"), u = pt("image-uploader"), f = pt("emoji-button"), d = pt("emoji-popup"), m = pt("gif-button"), x = pt("gif-popup"), b = pt("gif-search"), T = se({ tabs: [], map: {} }), w = se(0), C = se(false), N = se(false), I = se(false), O = se(""), G = se(0), j = pn({ loading: true, list: [] }), oe = se(0), ae = se(false), Me = se(""), E = se(false), B = se(false), F = ge(() => s.value.locale), de = ge(() => !!o.value.token), we = ge(() => s.value.imageUploader !== null), be = (z) => {
      const R = c.value, W = R.selectionStart, h = R.selectionEnd || 0, p = R.scrollTop;
      i.value = R.value.substring(0, W) + z + R.value.substring(h, R.value.length), R.focus(), R.selectionStart = W + z.length, R.selectionEnd = W + z.length, R.scrollTop = p;
    }, Qe = ({ key: z, ctrlKey: R, metaKey: W }) => {
      E.value || (R || W) && z === "Enter" && Ue();
    }, ut = async (z) => {
      const R = `![${s.value.locale.uploading} ${z.name}]()`;
      be(R), E.value = true;
      try {
        const W = await s.value.imageUploader(z);
        i.value = i.value.replace(R, `\r ![${z.name}](${W})`);
      } catch (W) {
        alert(W.message), i.value = i.value.replace(R, "");
      } finally {
        E.value = false;
      }
    }, Qt = (z) => {
      var R;
      if ((R = z.dataTransfer) != null && R.items) {
        const W = Ul(z.dataTransfer.items);
        W && we.value && (ut(W), z.preventDefault());
      }
    }, Pn = (z) => {
      if (z.clipboardData) {
        const R = Ul(z.clipboardData.items);
        R && we.value && ut(R);
      }
    }, Ot = () => {
      const z = u.value;
      z.files && we.value && ut(z.files[0]).then(() => {
        z.value = "";
      });
    }, Ue = async () => {
      var z;
      const { serverURL: R, lang: W, login: h, wordLimit: p, requiredMeta: g, recaptchaV3Key: y, turnstileKey: k } = s.value, v = { comment: Me.value, nick: l.value.nick, mail: l.value.mail, link: l.value.link, url: s.value.path, ua: await Ff() };
      if (!n.edit) if (o.value.token) v.nick = o.value.display_name, v.mail = o.value.email, v.link = o.value.url;
      else {
        if (h === "force") return;
        if (g.includes("nick") && !v.nick) {
          a.value.nick.focus(), alert(F.value.nickError);
          return;
        }
        if (g.includes("mail") && !v.mail || v.mail && !Jo(v.mail)) {
          a.value.mail.focus(), alert(F.value.mailError);
          return;
        }
        v.nick || (v.nick = F.value.anonymous);
      }
      if (!v.comment) {
        c.value.focus();
        return;
      }
      if (!ae.value) {
        alert(F.value.wordHint.replace("$0", p[0].toString()).replace("$1", p[1].toString()).replace("$2", G.value.toString()));
        return;
      }
      v.comment = fo(v.comment, T.value.map), n.replyId && n.rootId && (v.pid = n.replyId, v.rid = n.rootId, v.at = n.replyUser), E.value = true;
      try {
        y && (v.recaptchaV3 = await lh(y).execute("social")), k && (v.turnstile = await oh(k).execute("social"));
        const A = { serverURL: R, lang: W, token: o.value.token, comment: v }, S = await (n.edit ? tn({ objectId: n.edit.objectId, ...A }) : Ms(A));
        if (E.value = false, S.errmsg) {
          alert(S.errmsg);
          return;
        }
        r("submit", S.data), i.value = "", O.value = "", await qt(), n.replyId && r("cancelReply"), (z = n.edit) != null && z.objectId && r("cancelEdit");
      } catch (A) {
        E.value = false, alert(A.message);
      }
    }, On = (z) => {
      z.preventDefault();
      const { lang: R, serverURL: W } = s.value;
      js({ serverURL: W, lang: R }).then((h) => {
        o.value = h, (h.remember ? localStorage : sessionStorage).setItem("WALINE_USER", JSON.stringify(h)), r("log");
      });
    }, Ar = () => {
      o.value = {}, localStorage.setItem("WALINE_USER", "null"), sessionStorage.setItem("WALINE_USER", "null"), r("log");
    }, jn = (z) => {
      z.preventDefault();
      const { lang: R, serverURL: W } = s.value, h = 800, p = 800, g = (window.innerWidth - h) / 2, y = (window.innerHeight - p) / 2, k = new URLSearchParams({ lng: R, token: o.value.token }), v = window.open(`${W}/ui/profile?${k.toString()}`, "_blank", `width=${h},height=${p},left=${g},top=${y},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`);
      v == null || v.postMessage({ type: "TOKEN", data: o.value.token }, "*");
    }, vt = (z) => {
      var R, W, h, p;
      !((R = f.value) != null && R.contains(z.target)) && !((W = d.value) != null && W.contains(z.target)) && (C.value = false), !((h = m.value) != null && h.contains(z.target)) && !((p = x.value) != null && p.contains(z.target)) && (N.value = false);
    }, bt = async (z) => {
      var R;
      const { scrollTop: W, clientHeight: h, scrollHeight: p } = z.target, g = (h + W) / p, y = s.value.search, k = ((R = b.value) == null ? void 0 : R.value) ?? "";
      g < 0.9 || j.loading || B.value || (j.loading = true, (y.more && j.list.length ? await y.more(k, j.list.length) : await y.search(k)).length ? j.list = [...j.list, ...y.more && j.list.length ? await y.more(k, j.list.length) : await y.search(k)] : B.value = true, j.loading = false, setTimeout(() => {
        z.target.scrollTop = W;
      }, 50));
    }, jt = Cu((z) => {
      j.list = [], B.value = false, bt(z);
    }, 300);
    return Lt("click", vt), Lt("message", ({ data: z }) => {
      !z || z.type !== "profile" || (o.value = { ...o.value, ...z.data }, [localStorage, sessionStorage].filter((R) => R.getItem("WALINE_USER")).forEach((R) => {
        R.setItem("WALINE_USER", JSON.stringify(o));
      }));
    }), Jt([s, G], ([z, R]) => {
      const { wordLimit: W } = z;
      W ? R < W[0] && W[0] !== 0 ? (oe.value = W[0], ae.value = false) : R > W[1] ? (oe.value = W[1], ae.value = false) : (oe.value = W[1], ae.value = true) : (oe.value = 0, ae.value = true);
    }), dt(N, async (z) => {
      var R;
      if (!z) return;
      const W = s.value.search;
      b.value && (b.value.value = ""), j.loading = true, j.list = await (((R = W.default) == null ? void 0 : R.call(W)) ?? W.search("")), j.loading = false;
    }), bn(() => {
      var z;
      (z = n.edit) != null && z.objectId && (i.value = n.edit.orig), Jt(() => i.value, (R) => {
        const { highlighter: W, texRenderer: h } = s.value;
        Me.value = R, O.value = Of(R, { emojiMap: T.value.map, highlighter: W, texRenderer: h }), G.value = Df(R), R ? ko(c.value) : ko.destroy(c.value);
      }), Jt(() => s.value.emoji, async (R) => {
        T.value = await Bu(R);
      });
    }), (z, R) => {
      var W, h;
      return L(), P("div", { key: K(o).token, class: "wl-comment" }, [K(s).login !== "disable" && de.value && !((W = z.edit) != null && W.objectId) ? (L(), P("div", Ch, [D("div", Sh, [D("button", { type: "submit", class: "wl-logout-btn", title: F.value.logout, onClick: Ar }, [le(K(po), { size: 14 })], 8, $h), D("a", { href: "#", class: "wl-login-nick", "aria-label": "Profile", title: F.value.profile, onClick: jn }, [D("img", { src: K(o).avatar, alt: "avatar" }, null, 8, Ah)], 8, Rh)]), D("a", { href: "#", class: "wl-login-nick", "aria-label": "Profile", title: F.value.profile, onClick: jn, textContent: Y(K(o).display_name) }, null, 8, Eh)])) : J("v-if", true), D("div", Th, [K(s).login !== "force" && K(s).meta.length && !de.value ? (L(), P("div", { key: 0, class: me(["wl-header", `item${K(s).meta.length}`]) }, [(L(true), P(fe, null, Fe(K(s).meta, (p) => (L(), P("div", { key: p, class: "wl-header-item" }, [D("label", { for: `wl-${p}`, textContent: Y(F.value[p] + (K(s).requiredMeta.includes(p) || !K(s).requiredMeta.length ? "" : `(${F.value.optional})`)) }, null, 8, Ih), sr(D("input", { id: `wl-${p}`, ref_for: true, ref: (g) => {
        g && (a.value[p] = g);
      }, "onUpdate:modelValue": (g) => K(l)[p] = g, class: me(["wl-input", `wl-${p}`]), name: p, type: p === "mail" ? "email" : "text" }, null, 10, Lh), [[hu, K(l)[p]]])]))), 128))], 2)) : J("v-if", true), sr(D("textarea", { id: "wl-edit", ref: "textarea", "onUpdate:modelValue": R[0] || (R[0] = (p) => ve(i) ? i.value = p : null), class: "wl-editor", placeholder: z.replyUser ? `@${z.replyUser}` : F.value.placeholder, onKeydown: Qe, onDrop: Qt, onPaste: Pn }, null, 40, Mh), [[hs, K(i)]]), sr(D("div", Ph, [R[7] || (R[7] = D("hr", null, null, -1)), D("h4", null, Y(F.value.preview) + ":", 1), D("div", { class: "wl-content", innerHTML: O.value }, null, 8, Oh)], 512), [[yl, I.value]]), D("div", jh, [D("div", zh, [D("a", Dh, [le(K(Wf))]), sr(D("button", { ref: "emoji-button", type: "button", class: me(["wl-action", { active: C.value }]), title: F.value.emoji, onClick: R[1] || (R[1] = (p) => C.value = !C.value) }, [le(K(Uf))], 10, Fh), [[yl, T.value.tabs.length]]), K(s).search ? (L(), P("button", { key: 0, ref: "gif-button", type: "button", class: me(["wl-action", { active: N.value }]), title: F.value.gif, onClick: R[2] || (R[2] = (p) => N.value = !N.value) }, [le(K(Zf))], 10, Hh)) : J("v-if", true), D("input", { id: "wl-image-upload", ref: "image-uploader", class: "upload", "aria-hidden": "true", type: "file", accept: ".png,.jpg,.jpeg,.webp,.bmp,.gif", onChange: Ot }, null, 544), we.value ? (L(), P("label", { key: 1, for: "wl-image-upload", class: "wl-action", title: F.value.uploadImage, "aria-label": F.value.uploadImage }, [le(K(Nf))], 8, Uh)) : J("v-if", true), D("button", { type: "button", class: me(["wl-action", { active: I.value }]), title: F.value.preview, onClick: R[3] || (R[3] = (p) => I.value = !I.value) }, [le(K(Vf))], 10, Nh)]), D("div", Bh, [R[9] || (R[9] = D("div", { class: "wl-captcha-container" }, null, -1)), D("div", Vh, [it(Y(G.value) + " ", 1), K(s).wordLimit ? (L(), P("span", Wh, [R[8] || (R[8] = it(" \xA0/\xA0 ")), D("span", { class: me({ illegal: !ae.value }), textContent: Y(oe.value) }, null, 10, qh)])) : J("v-if", true), it(" \xA0" + Y(F.value.word), 1)]), K(s).login !== "disable" && !de.value ? (L(), P("button", { key: 0, type: "button", class: "wl-btn", onClick: On, textContent: Y(F.value.login) }, null, 8, Kh)) : J("v-if", true), K(s).login !== "force" || de.value ? (L(), P("button", { key: 1, type: "submit", class: "primary wl-btn", title: "Cmd|Ctrl + Enter", disabled: E.value, onClick: Ue }, [E.value ? (L(), st(K(In), { key: 0, size: 16 })) : (L(), P(fe, { key: 1 }, [it(Y(F.value.submit), 1)], 64))], 8, Gh)) : J("v-if", true)]), D("div", { ref: "gif-popup", class: me(["wl-gif-popup", { display: N.value }]) }, [D("input", { ref: "gif-search", type: "text", placeholder: F.value.gifSearchPlaceholder, onInput: R[4] || (R[4] = (...p) => K(jt) && K(jt)(...p)) }, null, 40, Zh), j.list.length ? (L(), st(_h, { key: 0, items: j.list, "column-width": 200, gap: 6, onInsert: R[5] || (R[5] = (p) => be(p)), onScroll: bt }, null, 8, ["items"])) : J("v-if", true), j.loading ? (L(), P("div", Jh, [le(K(In), { size: 30 })])) : J("v-if", true)], 2), D("div", { ref: "emoji-popup", class: me(["wl-emoji-popup", { display: C.value }]) }, [(L(true), P(fe, null, Fe(T.value.tabs, (p, g) => (L(), P(fe, { key: p.name }, [g === w.value ? (L(), P("div", Yh, [(L(true), P(fe, null, Fe(p.items, (y) => (L(), P("button", { key: y, type: "button", title: y, onClick: (k) => be(`:${y}:`) }, [C.value ? (L(), P("img", { key: 0, class: "wl-emoji", src: T.value.map[y], alt: y, loading: "lazy", referrerPolicy: "no-referrer" }, null, 8, Xh)) : J("v-if", true)], 8, Qh))), 128))])) : J("v-if", true)], 64))), 128)), T.value.tabs.length > 1 ? (L(), P("div", ep, [(L(true), P(fe, null, Fe(T.value.tabs, (p, g) => (L(), P("button", { key: p.name, type: "button", class: me(["wl-tab", { active: w.value === g }]), onClick: (y) => w.value = g }, [D("img", { class: "wl-emoji", src: p.icon, alt: p.name, title: p.name, loading: "lazy", referrerPolicy: "no-referrer" }, null, 8, np)], 10, tp))), 128))])) : J("v-if", true)], 2)])]), z.replyId || (h = z.edit) != null && h.objectId ? (L(), P("button", { key: 1, type: "button", class: "wl-close", title: F.value.cancelReply, onClick: R[6] || (R[6] = (p) => z.replyId ? r("cancelReply") : r("cancelEdit")) }, [le(K(po), { size: 24 })], 8, rp)) : J("v-if", true)]);
    };
  } });
  var sp = ["id"];
  var ip = { class: "wl-user", "aria-hidden": "true" };
  var lp = ["src"];
  var op = { class: "wl-card" };
  var ap = { class: "wl-head" };
  var cp = ["href"];
  var up = { key: 1, class: "wl-nick" };
  var fp = ["textContent"];
  var hp = ["textContent"];
  var pp = ["textContent"];
  var dp = ["textContent"];
  var gp = ["textContent"];
  var mp = { class: "wl-comment-actions" };
  var vp = ["title"];
  var bp = ["title"];
  var yp = { class: "wl-meta", "aria-hidden": "true" };
  var wp = ["data-value", "textContent"];
  var kp = { key: 0, class: "wl-content" };
  var xp = { key: 0 };
  var _p = ["href"];
  var Cp = ["innerHTML"];
  var Sp = { key: 1, class: "wl-admin-actions" };
  var $p = { class: "wl-comment-status" };
  var Rp = ["disabled", "onClick", "textContent"];
  var Ap = { key: 3, class: "wl-quote" };
  var Ep = /* @__PURE__ */ mn({ __name: "CommentCard", props: { comment: {}, edit: {}, rootId: {}, reply: {} }, emits: ["log", "submit", "delete", "like", "sticky", "edit", "reply", "status"], setup(e, { emit: t }) {
    const n = e, r = t, s = ["approved", "waiting", "spam"], i = lr(Fn), l = go(), o = ju(), a = Rr(), c = ge(() => i.value.locale), u = ge(() => {
      const { link: w } = n.comment;
      return w ? ri(w) ? w : `https://${w}` : "";
    }), f = ge(() => l.value.includes(n.comment.objectId)), d = ge(() => Go(new Date(n.comment.time), o.value, c.value)), m = ge(() => a.value.type === "administrator"), x = ge(() => n.comment.user_id && a.value.objectId === n.comment.user_id), b = ge(() => {
      var w;
      return n.comment.objectId === ((w = n.reply) == null ? void 0 : w.objectId);
    }), T = ge(() => {
      var w;
      return n.comment.objectId === ((w = n.edit) == null ? void 0 : w.objectId);
    });
    return (w, C) => {
      var N;
      const I = nc("CommentCard", true);
      return L(), P("div", { id: w.comment.objectId.toString(), class: "wl-card-item" }, [D("div", ip, [w.comment.avatar ? (L(), P("img", { key: 0, class: "wl-user-avatar", src: w.comment.avatar, alt: "" }, null, 8, lp)) : J("v-if", true), w.comment.type ? (L(), st(K(Gf), { key: 1 })) : J("v-if", true)]), D("div", op, [D("div", ap, [u.value ? (L(), P("a", { key: 0, class: "wl-nick", href: u.value, target: "_blank", rel: "nofollow noopener noreferrer" }, Y(w.comment.nick), 9, cp)) : (L(), P("span", up, Y(w.comment.nick), 1)), w.comment.type === "administrator" ? (L(), P("span", { key: 2, class: "wl-badge", textContent: Y(c.value.admin) }, null, 8, fp)) : J("v-if", true), w.comment.label ? (L(), P("span", { key: 3, class: "wl-badge", textContent: Y(w.comment.label) }, null, 8, hp)) : J("v-if", true), w.comment.sticky ? (L(), P("span", { key: 4, class: "wl-badge", textContent: Y(c.value.sticky) }, null, 8, pp)) : J("v-if", true), typeof w.comment.level == "number" ? (L(), P("span", { key: 5, class: me(`wl-badge level${w.comment.level}`), textContent: Y(c.value[`level${w.comment.level}`] || `Level ${w.comment.level}`) }, null, 10, dp)) : J("v-if", true), D("span", { class: "wl-time", textContent: Y(d.value) }, null, 8, gp), D("div", mp, [m.value || x.value ? (L(), P(fe, { key: 0 }, [D("button", { type: "button", class: "wl-edit", onClick: C[0] || (C[0] = (O) => r("edit", w.comment)) }, [le(K(Kf))]), D("button", { type: "button", class: "wl-delete", onClick: C[1] || (C[1] = (O) => r("delete", w.comment)) }, [le(K(Hf))])], 64)) : J("v-if", true), D("button", { type: "button", class: "wl-like", title: f.value ? c.value.cancelLike : c.value.like, onClick: C[2] || (C[2] = (O) => r("like", w.comment)) }, [le(K(Bf), { active: f.value }, null, 8, ["active"]), it(" " + Y("like" in w.comment ? w.comment.like : ""), 1)], 8, vp), D("button", { type: "button", class: me(["wl-reply", { active: b.value }]), title: b.value ? c.value.cancelReply : c.value.reply, onClick: C[3] || (C[3] = (O) => r("reply", b.value ? null : w.comment)) }, [le(K(qf))], 10, bp)])]), D("div", yp, [(L(), P(fe, null, Fe(["addr", "browser", "os"], (O) => (L(), P(fe, null, [w.comment[O] ? (L(), P("span", { key: O, class: me(`wl-${O}`), "data-value": w.comment[O], textContent: Y(w.comment[O]) }, null, 10, wp)) : J("v-if", true)], 64))), 64))]), T.value ? J("v-if", true) : (L(), P("div", kp, ["reply_user" in w.comment && w.comment.reply_user ? (L(), P("p", xp, [D("a", { href: "#" + w.comment.pid }, "@" + Y(w.comment.reply_user.nick), 9, _p), C[17] || (C[17] = D("span", null, ": ", -1))])) : J("v-if", true), D("div", { innerHTML: w.comment.comment }, null, 8, Cp)])), m.value && !T.value ? (L(), P("div", Sp, [D("span", $p, [(L(), P(fe, null, Fe(s, (O) => D("button", { key: O, type: "submit", class: me(`wl-btn wl-${O}`), disabled: w.comment.status === O, onClick: (G) => r("status", { status: O, comment: w.comment }), textContent: Y(c.value[O]) }, null, 10, Rp)), 64))]), m.value && !("rid" in w.comment) ? (L(), P("button", { key: 0, type: "submit", class: "wl-btn wl-sticky", onClick: C[4] || (C[4] = (O) => r("sticky", w.comment)) }, Y(w.comment.sticky ? c.value.unsticky : c.value.sticky), 1)) : J("v-if", true)])) : J("v-if", true), b.value || T.value ? (L(), P("div", { key: 2, class: me({ "wl-reply-wrapper": b.value, "wl-edit-wrapper": T.value }) }, [le(xo, { edit: w.edit, "reply-id": (N = w.reply) == null ? void 0 : N.objectId, "reply-user": w.comment.nick, "root-id": w.rootId, onLog: C[5] || (C[5] = (O) => r("log")), onCancelReply: C[6] || (C[6] = (O) => r("reply", null)), onCancelEdit: C[7] || (C[7] = (O) => r("edit", null)), onSubmit: C[8] || (C[8] = (O) => r("submit", O)) }, null, 8, ["edit", "reply-id", "reply-user", "root-id"])], 2)) : J("v-if", true), "children" in w.comment ? (L(), P("div", Ap, [(L(true), P(fe, null, Fe(w.comment.children, (O) => (L(), st(I, { key: O.objectId, comment: O, reply: w.reply, edit: w.edit, "root-id": w.rootId, onLog: C[9] || (C[9] = (G) => r("log")), onDelete: C[10] || (C[10] = (G) => r("delete", G)), onEdit: C[11] || (C[11] = (G) => r("edit", G)), onLike: C[12] || (C[12] = (G) => r("like", G)), onReply: C[13] || (C[13] = (G) => r("reply", G)), onStatus: C[14] || (C[14] = (G) => r("status", G)), onSticky: C[15] || (C[15] = (G) => r("sticky", G)), onSubmit: C[16] || (C[16] = (G) => r("submit", G)) }, null, 8, ["comment", "reply", "edit", "root-id"]))), 128))])) : J("v-if", true)])], 8, sp);
    };
  } });
  var _o = "3.5.7";
  var Tp = { "data-waline": "" };
  var Ip = { class: "wl-meta-head" };
  var Lp = { class: "wl-count" };
  var Mp = ["textContent"];
  var Pp = { class: "wl-sort" };
  var Op = ["onClick"];
  var jp = { class: "wl-cards" };
  var zp = { key: 1, class: "wl-operation" };
  var Dp = ["textContent"];
  var Fp = { key: 2, class: "wl-loading" };
  var Hp = ["textContent"];
  var Up = { key: 4, class: "wl-operation" };
  var Np = ["textContent"];
  var Bp = { key: 5, class: "wl-power" };
  var Vp = /* @__PURE__ */ mn({ __name: "WalineComment", props: { serverURL: {}, path: {}, meta: {}, requiredMeta: {}, wordLimit: {}, pageSize: {}, lang: {}, locale: {}, commentSorting: {}, dark: { type: [String, Boolean] }, login: {}, noCopyright: { type: Boolean }, recaptchaV3Key: {}, turnstileKey: {}, reaction: { type: [Array, Boolean] }, emoji: {}, search: {}, highlighter: { type: Function }, imageUploader: { type: Function }, texRenderer: { type: Function } }, setup(e) {
    const t = e, n = Rr(), r = go(), s = se("loading"), i = se(0), l = se(1), o = se(0), a = ge(() => Wo(t)), c = se(a.value.commentSorting), u = se([]), f = se(null), d = se(null), m = ge(() => qo(a.value.dark)), x = ge(() => a.value.locale);
    Fu(m, { id: "waline-darkmode" });
    let b = null;
    const T = (E) => {
      const { serverURL: B, path: F, pageSize: de } = a.value, we = new AbortController();
      s.value = "loading", b == null || b(), Ls({ serverURL: B, lang: a.value.lang, path: F, pageSize: de, sortBy: ei[c.value], page: E, signal: we.signal, token: n.value.token }).then((be) => {
        s.value = "success", i.value = be.count, u.value.push(...be.data), l.value = E, o.value = be.totalPages;
      }).catch((be) => {
        be.name !== "AbortError" && (console.error(be.message), s.value = "error");
      }), b = we.abort.bind(we);
    }, w = () => {
      T(l.value + 1);
    }, C = () => {
      i.value = 0, u.value = [], T(1);
    }, N = (E) => {
      c.value !== E && (c.value = E, C());
    }, I = (E) => {
      f.value = E;
    }, O = (E) => {
      d.value = E;
    }, G = (E) => {
      if (d.value) d.value.comment = E.comment, d.value.orig = E.orig;
      else if ("rid" in E) {
        const B = u.value.find(({ objectId: F }) => F === E.rid);
        if (!B) return;
        Array.isArray(B.children) || (B.children = []), B.children.push(E);
      } else u.value.unshift(E), i.value += 1;
    }, j = async ({ comment: E, status: B }) => {
      if (E.status === B) return;
      const { serverURL: F, lang: de } = a.value;
      await tn({ serverURL: F, lang: de, token: n.value.token, objectId: E.objectId, comment: { status: B } }), E.status = B;
    }, oe = async (E) => {
      if ("rid" in E) return;
      const { serverURL: B, lang: F } = a.value;
      await tn({ serverURL: B, lang: F, token: n.value.token, objectId: E.objectId, comment: { sticky: E.sticky ? 0 : 1 } }), E.sticky = !E.sticky;
    }, ae = async ({ objectId: E }) => {
      if (!confirm("Are you sure you want to delete this comment?")) return;
      const { serverURL: B, lang: F } = a.value;
      await Ps({ serverURL: B, lang: F, token: n.value.token, objectId: E }), u.value.some((de, we) => de.objectId === E ? (u.value = u.value.filter((be, Qe) => Qe !== we), true) : de.children.some((be, Qe) => be.objectId === E ? (u.value[we].children = de.children.filter((ut, Qt) => Qt !== Qe), true) : false));
    }, Me = async (E) => {
      const { serverURL: B, lang: F } = a.value, { objectId: de } = E, we = r.value.includes(de);
      await tn({ serverURL: B, lang: F, objectId: de, token: n.value.token, comment: { like: !we } }), we ? r.value = r.value.filter((be) => be !== de) : (r.value = [...r.value, de], r.value.length > 50 && (r.value = r.value.slice(-50))), E.like = Math.max(0, (E.like || 0) + (we ? -1 : 1));
    };
    return ac(Fn, a), bn(() => {
      Jt(() => [t.serverURL, t.path], () => {
        C();
      });
    }), Xr(() => {
      b == null || b();
    }), (E, B) => (L(), P("div", Tp, [le(bh), !f.value && !d.value ? (L(), st(xo, { key: 0, onLog: C, onSubmit: G })) : J("v-if", true), D("div", Ip, [D("div", Lp, [i.value ? (L(), P("span", { key: 0, class: "wl-num", textContent: Y(i.value) }, null, 8, Mp)) : J("v-if", true), it(" " + Y(x.value.comment), 1)]), D("ul", Pp, [(L(true), P(fe, null, Fe(K(Bo), (F) => (L(), P("li", { key: F, class: me([F === c.value ? "active" : ""]), onClick: (de) => N(F) }, Y(x.value[F]), 11, Op))), 128))])]), D("div", jp, [(L(true), P(fe, null, Fe(u.value, (F) => (L(), st(Ep, { key: F.objectId, "root-id": F.objectId, comment: F, reply: f.value, edit: d.value, onLog: C, onReply: I, onEdit: O, onSubmit: G, onStatus: j, onDelete: ae, onSticky: oe, onLike: Me }, null, 8, ["root-id", "comment", "reply", "edit"]))), 128))]), s.value === "error" ? (L(), P("div", zp, [D("button", { type: "button", class: "wl-btn", onClick: C, textContent: Y(x.value.refresh) }, null, 8, Dp)])) : s.value === "loading" ? (L(), P("div", Fp, [le(K(In), { size: 30 })])) : u.value.length ? l.value < o.value ? (L(), P("div", Up, [D("button", { type: "button", class: "wl-btn", onClick: w, textContent: Y(x.value.more) }, null, 8, Np)])) : J("v-if", true) : (L(), P("div", { key: 3, class: "wl-empty", textContent: Y(x.value.sofa) }, null, 8, Hp)), a.value.noCopyright ? J("v-if", true) : (L(), P("div", Bp, [B[0] || (B[0] = it(" Powered by ")), B[1] || (B[1] = D("a", { href: "https://github.com/walinejs/waline", target: "_blank", rel: "noopener noreferrer" }, " Waline ", -1)), it(" v" + Y(K(_o)), 1)]))]));
  } });
  var Co = (e, t) => {
    t.forEach((n, r) => {
      const s = e[r].time;
      typeof s == "number" && (n.innerText = s.toString());
    });
  };
  var So = ({ serverURL: e, path: t = window.location.pathname, selector: n = ".waline-pageview-count", update: r = true, lang: s = navigator.language }) => {
    const i = new AbortController(), l = Array.from(document.querySelectorAll(n)), o = (c) => {
      const u = $s(c);
      return u !== null && t !== u;
    }, a = (c) => zs({ serverURL: Hn(e), paths: c.map((u) => $s(u) ?? t), lang: s, signal: i.signal }).then((u) => Co(u, c)).catch(Hl);
    if (r) {
      const c = l.filter((f) => !o(f)), u = l.filter(o);
      Ds({ serverURL: Hn(e), path: t, lang: s }).then((f) => Co(f, c)), u.length && a(u);
    } else a(l);
    return i.abort.bind(i);
  };
  var Wp = ({ el: e = "#waline", path: t = window.location.pathname, comment: n = false, pageview: r = false, ...s }) => {
    const i = e ? gs(e) : null;
    if (e && !i) throw new Error("Option 'el' do not match any domElement!");
    if (!s.serverURL) throw new Error("Option 'serverURL' is missing!");
    const l = pn({ ...s }), o = pn({ comment: n, pageview: r, path: t }), a = () => {
      o.comment && ho({ serverURL: l.serverURL, path: o.path, ...zt(o.comment) ? { selector: o.comment } : {} });
    }, c = () => {
      o.pageview && So({ serverURL: l.serverURL, path: o.path, ...zt(o.pageview) ? { selector: o.pageview } : {} });
    };
    let u = null;
    i && (u = mu(() => te(Vp, { path: o.path, ...l })), u.mount(i));
    const f = tl(a), d = tl(c);
    return { el: i, update: ({ comment: m, pageview: x, path: b = window.location.pathname, ...T } = {}) => {
      Object.entries(T).forEach(([w, C]) => {
        l[w] = C;
      }), o.path = b, m !== void 0 && (o.comment = m), x !== void 0 && (o.pageview = x);
    }, destroy: () => {
      u == null || u.unmount(), f(), d();
    } };
  };
  var qp = ({ el: e, serverURL: t, count: n, lang: r = navigator.language }) => {
    const s = Rr(), i = gs(e), l = new AbortController();
    return Fs({ serverURL: t, count: n, lang: r, signal: l.signal, token: s.value.token }).then((o) => i && o.length ? (i.innerHTML = `<ul class="wl-recent-list">${o.map((a) => `<li class="wl-recent-item"><a href="${a.url}">${a.nick}</a>\uFF1A${a.comment}</li>`).join("")}</ul>`, { comments: o, destroy: () => {
      l.abort(), i.innerHTML = "";
    } }) : { comments: o, destroy: () => l.abort() });
  };
  var Kp = ({ el: e, serverURL: t, count: n, locale: r, lang: s = navigator.language, mode: i = "list" }) => {
    const l = gs(e), o = new AbortController();
    return Hs({ serverURL: t, pageSize: n, lang: s, signal: o.signal }).then((a) => !l || !a.length ? { users: a, destroy: () => o.abort() } : (r = { ...Qs(s), ...typeof r == "object" ? r : {} }, l.innerHTML = `<ul class="wl-user-${i}">${a.map((c, u) => [`<li class="wl-user-item" aria-label="${c.nick}">`, c.link && `<a href="${c.link}" target="_blank">`, '<div class="wl-user-avatar">', `<img src="${c.avatar}" alt="${c.nick}">`, `<span class="wl-user-badge">${u + 1}</span>`, "</div>", '<div class="wl-user-meta">', '<div class="wl-user-name">', c.nick, c.level && `<span class="wl-badge">${r ? r[`level${c.level}`] : `Level ${c.level}`}</span>`, c.label && `<span class="wl-badge">${c.label}</span>`, "</div>", c.link && c.link, "</div>", c.link && "</a>", "</li>"].filter((f) => f).join("")).join("")}</ul>`, { users: a, destroy: () => {
      o.abort(), l.innerHTML = "";
    } }));
  };
})();
/** * @vue/shared v3.5.13 * (c) 2018-present Yuxi (Evan) You and Vue contributors * @license MIT **/
/*! #__NO_SIDE_EFFECTS__ */
/** * @vue/reactivity v3.5.13 * (c) 2018-present Yuxi (Evan) You and Vue contributors * @license MIT **/
/** * @vue/runtime-core v3.5.13 * (c) 2018-present Yuxi (Evan) You and Vue contributors * @license MIT **/
/** * @vue/runtime-dom v3.5.13 * (c) 2018-present Yuxi (Evan) You and Vue contributors * @license MIT **/
