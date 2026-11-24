import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SEO_SLUGS: string[] = [
  "whatsapp-sanal-numara",
  "whatsapp-sanal-numara-satin-al",
  "whatsapp-sms-onay",
  "whatsapp-ikinci-numara",
  "whatsapp-business-sanal-numara",
  "whatsapp-numara-dogrulama",
  "whatsapp-sms-kodu",
  "whatsapp-sanal-numara-fiyatlari",
  "whatsapp-numara-alma-rehberi",
  "whatsapp-numara-guvenligi",
  "sanal-numara-nedir",
  "sanal-numara-satin-al",
  "sanal-numara-fiyatlari",
  "ucuz-sanal-numara",
  "gecici-numara",
  "telefon-numarasi-satin-al",
  "yurtdisi-sanal-numara",
  "turkiye-sanal-numara",
  "sanal-numara-kullanimi",
  "sanal-numara-guvenilir-mi",
  "sms-onay",
  "sms-onay-satin-al",
  "sms-onay-siteleri",
  "sms-onay-fiyatlari",
  "sms-kodu-alma",
  "mobil-onay",
  "sms-dogrulama",
  "sms-onay-guvenligi",
  "sms-kodu-gelmiyor",
  "sms-onay-rehberi",
  "telegram-sanal-numara",
  "telegram-sms-onay",
  "instagram-sms-onay",
  "google-sms-onay",
  "facebook-sms-onay",
  "tiktok-sms-onay",
  "discord-sms-onay",
  "x-sms-onay",
  "tinder-sms-onay",
  "gmail-sms-onay",
  "sanal-numara-nasil-alinir",
  "sanal-numara-nasil-satin-alinir",
  "sanal-numara-odeme-yontemleri",
  "sanal-numara-iban-ile-odeme",
  "sms-onay-nasil-calisir",
  "numara-alirken-dikkat-edilmesi-gerekenler",
  "sms-onay-iade",
  "sanal-numara-sss",
  "onay-merkezi-guvenilir-mi",
  "onay-merkezi-sanal-numara",
  "en-populer-sanal-numara-siteleri",
  "turkiyenin-sanal-numara-saglayicilari",
  "dunyanin-en-bilinen-sms-onay-siteleri",
  "onay-merkezi-rakipleri-ve-alternatifleri",
  "smsvar-incelemesi",
  "smmsim-incelemesi",
  "sms-prime-incelemesi",
  "smsvar-alternatifleri",
  "smmsim-alternatifleri",
  "onay-merkezi-karsilastirmasi",
  "5sim-incelemesi",
  "sms-man-incelemesi",
  "smspool-incelemesi",
  "smspva-incelemesi",
  "sms-activate-incelemesi",
  "textverified-incelemesi",
  "herosms-incelemesi",
  "onlinesim-incelemesi",
  "quackr-incelemesi",
  "hushed-incelemesi",
  "5sim-alternatifleri",
  "sms-man-alternatifleri",
  "smspool-alternatifleri",
  "smspva-alternatifleri",
  "sms-activate-alternatifleri",
  "textverified-alternatifleri",
  "herosms-alternatifleri",
  "onlinesim-alternatifleri",
  "quackr-alternatifleri",
  "sms-onay-siteleri-karsilastirmasi",
  "sanal-numara-fiyat-karsilastirmasi",
  "en-uygun-sanal-numara-saglayicilari",
  "ucuz-sms-onay-platformlari",
  "turk-numarasi-sunan-platformlar",
  "yabanci-numara-sunan-platformlar",
  "whatsapp-numara-saglayicilari-karsilastirmasi",
  "telegram-numara-saglayicilari-karsilastirmasi",
  "instagram-sms-onay-saglayicilari",
  "google-sms-onay-saglayicilari",
  "uzun-sureli-sanal-numara-saglayicilari",
  "tek-kullanimlik-numara-platformlari",
  "sanal-numara-servislerinde-iade-politikalari",
  "sanal-numara-servislerinde-odeme-yontemleri",
  "sms-onay-servislerinde-api-karsilastirmasi",
  "sanal-numara-servislerinde-guvenlik-karsilastirmasi",
  "gercek-sim-ve-voip-numara-karsilastirmasi",
  "sms-gelmeme-oranlari-ve-servis-guvenilirligi",
  "sanal-numara-satin-alirken-saglayici-secimi",
  "uluslararasi-sanal-numara-platformlari",
  "2026-sanal-numara-platformlari-rehberi",
];

const SEO_SLUG_SET = new Set(SEO_SLUGS);

function normalizeSlugCandidate(raw: string): string {
  return raw
    .replace(/İ/g, "i")
    .replace(/I/g, "i")
    .toLowerCase()
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/\.html$/i, "");
}

async function startServer() {
  const app = express();
  const PORT = 3000;
  const isProd = process.env.NODE_ENV === "production";
  const distDir = path.resolve(__dirname, "dist");
  const publicDir = path.resolve(__dirname, "public");

  app.disable("x-powered-by");

  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
  });

  // Explicit sitemap.xml and robots.txt handlers ensuring exact Content-Type
  app.get("/sitemap.xml", (_req, res, next) => {
    const baseDir = isProd && fs.existsSync(distDir) ? distDir : publicDir;
    const sitemapPath = path.join(baseDir, "sitemap.xml");
    if (!fs.existsSync(sitemapPath)) return next();
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    return res.sendFile(sitemapPath);
  });

  app.get("/robots.txt", (_req, res, next) => {
    const baseDir = isProd && fs.existsSync(distDir) ? distDir : publicDir;
    const robotsPath = path.join(baseDir, "robots.txt");
    if (!fs.existsSync(robotsPath)) return next();
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.sendFile(robotsPath);
  });

  // Explicit allowlisted routes for all 100 standalone SEO pages (plus case/Turkish/trailing-slash 301 normalization)
  app.get("/:slug", (req, res, next) => {
    const rawSlug = req.params.slug;
    if (req.query && ("html-proxy" in req.query || "direct" in req.query)) {
      return next();
    }
    const hasTrailingSlash = req.path.length > 1 && req.path.endsWith("/");
    if (SEO_SLUG_SET.has(rawSlug)) {
      if (hasTrailingSlash) {
        return res.redirect(301, `/${rawSlug}`);
      }
      const baseDir = isProd && fs.existsSync(distDir) ? distDir : publicDir;
      const htmlPath = path.join(baseDir, rawSlug, "index.html");
      if (!fs.existsSync(htmlPath)) {
        return next();
      }
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.sendFile(htmlPath);
    }
    const normalized = normalizeSlugCandidate(rawSlug);
    if (SEO_SLUG_SET.has(normalized)) {
      return res.redirect(301, `/${normalized}`);
    }
    return next();
  });

  const serveSourceBundle = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const baseDir = isProd && fs.existsSync(distDir) ? distDir : publicDir;
    const bundlePath = path.join(baseDir, "downloads", "onay-merkezi-tum-kodlar.html");
    if (!fs.existsSync(bundlePath)) {
      return next();
    }
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("X-Robots-Tag", "noindex, nofollow");
    if (req.query.download === "1") {
      res.setHeader("Content-Disposition", 'attachment; filename="onay-merkezi-tum-kodlar.html"');
    }
    return res.sendFile(bundlePath);
  };

  const serveTextBundle = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const baseDir = isProd && fs.existsSync(distDir) ? distDir : publicDir;
    const txtPath = path.join(baseDir, "downloads", "onay-merkezi-tum-kodlar.txt");
    if (!fs.existsSync(txtPath)) {
      return next();
    }
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("X-Robots-Tag", "noindex, nofollow");
    if (req.query.download === "1") {
      res.setHeader("Content-Disposition", 'attachment; filename="onay-merkezi-tum-kodlar.txt"');
    }
    return res.sendFile(txtPath);
  };

  app.get("/onay-merkezi-tum-kodlar.html", serveSourceBundle);
  app.get("/downloads/onay-merkezi-tum-kodlar.html", serveSourceBundle);
  app.get("/onay-merkezi-tum-kodlar.txt", serveTextBundle);
  app.get("/downloads/onay-merkezi-tum-kodlar.txt", serveTextBundle);

  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "mpa",
    });
    app.use(vite.middlewares);

    app.get("/", (_req, res) => {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.sendFile(path.resolve(__dirname, "index.html"));
    });
  } else {
    app.use(express.static(distDir, { extensions: ["html"] }));
    app.get("/", (_req, res) => {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.sendFile(path.join(distDir, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Onay Merkezi server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
