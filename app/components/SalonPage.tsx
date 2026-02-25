"use client";

import React, { useState, useEffect, useRef, FC, ReactNode } from "react";
import Image from "next/image";
import styles from "./SalonPage.module.scss";

// ─── TYPES ───────────────────────────────────────────────────────────────────

export type SupportedLocale = "ru" | "en" | "tr" | "de" | "fr";

interface NavT {
    home: string;
    procedures: string;
    booking: string;
    about: string;
    contact: string;
}
interface HeroT {
    hotelBadge: string;
    headline: string;
    headline2: string;
    sub: string;
    cta: string;
    scroll: string;
}
interface ProcT {
    name: string;
    desc: string;
    price: string;
    duration: string;
    tag?: string;
}
interface ProceduresT {
    title: string;
    sub: string;
    bookBtn: string;
    list: ProcT[];
}
interface AboutT {
    title: string;
    sub: string;
    body1: string;
    body2: string;
    body3: string;
    stats: { num: string; label: string }[];
}
interface BookingT {
    title: string;
    sub: string;
    steps: { num: string; label: string }[];
    directBtn: string;
    note: string;
}
interface ContactT {
    title: string;
    sub: string;
    address: string;
    hours: string;
    whatsapp: string;
    scan: string;
    scanNote: string;
}
interface FooterT {
    copy: string;
    privacy: string;
}
interface T {
    nav: NavT;
    hero: HeroT;
    procedures: ProceduresT;
    about: AboutT;
    booking: BookingT;
    contact: ContactT;
    footer: FooterT;
}

// ─── TRANSLATIONS ────────────────────────────────────────────────────────────

const TR: Record<SupportedLocale, T> = {
    ru: {
        nav: {
            home: "Главная",
            procedures: "Процедуры",
            booking: "Запись",
            about: "О салоне",
            contact: "Контакты",
        },
        hero: {
            hotelBadge: "TUI Magic Life Jacaranda · Ölüdeniz, Турция",
            headline: "Отдыхайте на море —",
            headline2: "мы позаботимся о вашей коже",
            sub: "Профессиональный дерматологический уход прямо в отеле. Никуда ехать не нужно — всё рядом.",
            cta: "Записаться",
            scroll: "Смотреть процедуры",
        },
        procedures: {
            title: "Наши процедуры",
            sub: "Девять авторских уходов для отдыхающих у моря",
            bookBtn: "Записаться в WhatsApp",
            list: [
                {
                    name: "Уход после загара",
                    desc: "Успокаивает раздражённую кожу, снимает покраснения и восстанавливает барьер после солнца. С экстрактами алоэ и пантенолом — идеально для первого дня после пляжа.",
                    price: "€45",
                    duration: "45 мин",
                    tag: "Хит сезона",
                },
                {
                    name: "Глубокое увлажнение OXYjet",
                    desc: "Безинъекционная оксигенотерапия насыщает кожу кислородом и гиалуроновой кислотой на клеточном уровне. Лицо становится гладким, упругим и сияющим — как после спа-отпуска!",
                    price: "€90",
                    duration: "60 мин",
                    tag: "Популярно",
                },
                {
                    name: "Уход для чувствительной кожи",
                    desc: "Мягкое очищение и питание без агрессии: успокаиваем раздражения, укрепляем защитный барьер. Подходит для тех, кто реагирует на солнце или хлор из бассейна.",
                    price: "€65",
                    duration: "50 мин",
                },
                {
                    name: "Уход за возрастной кожей",
                    desc: "Разглаживает морщинки, повышает тонус и эластичность с помощью пептидов и коллагена. Верните коже молодость и свежесть — без боли и долгого восстановления.",
                    price: "€85",
                    duration: "60 мин",
                    tag: "Антивозраст",
                },
                {
                    name: "Глубокое очищение при акне",
                    desc: "Безболезненное удаление воспалений, детокс пор и антибактериальная терапия. Кожа очищается глубоко, акне уходит, а лицо становится ровным и матовым.",
                    price: "€70",
                    duration: "55 мин",
                },
                {
                    name: "Классический массаж лица",
                    desc: "Расслабляет мышцы, улучшает кровоток и лимфоток. Лицо подтягивается, отёки спадают — 30 минут релакса для идеального контура.",
                    price: "€40",
                    duration: "30 мин",
                },
                {
                    name: "Лимфодренажный массаж",
                    desc: "Удаляет отёки, выводит токсины и ускоряет регенерацию. Отлично после активного дня — тело становится лёгким, кожа — чистой и здоровой.",
                    price: "€60",
                    duration: "45 мин",
                },
                {
                    name: "Прессотерапия",
                    desc: "Аппаратный массаж сжатием для ног и тела: борется с целлюлитом, улучшает циркуляцию и снимает усталость. Идеально для тех, кто много ходит по пляжу.",
                    price: "€55",
                    duration: "40 мин",
                    tag: "Для тела",
                },
                {
                    name: "Фракционная прессотерапия",
                    desc: "Точечное воздействие на проблемные зоны: глубокий детокс, моделирование фигуры и лимфодренаж. Результат — стройность и лёгкость без диет.",
                    price: "€75",
                    duration: "50 мин",
                },
            ],
        },
        about: {
            title: "Jacaranda Beauty Bar",
            sub: "Ваш салон красоты прямо в отеле",
            body1: "Мы находимся внутри отеля TUI Magic Life Jacaranda в Олюденизе — одном из самых красивых курортов Турции. Вам не нужно никуда ехать: просто спуститесь к нам после пляжа.",
            body2: "Наши специалисты сочетают европейские техники ухода с тёплым турецким гостеприимством. Каждая процедура — это персональный ритуал, а не поточная работа.",
            body3: "Белоснежный интерьер, розовый свет, аромат цветов и тихая музыка — здесь хочется остаться подольше.",
            stats: [
                { num: "2 400+", label: "Довольных гостей" },
                { num: "9", label: "Авторских уходов" },
                { num: "5★", label: "Рейтинг гостей" },
                { num: "2014", label: "Год основания" },
            ],
        },
        booking: {
            title: "Как записаться",
            sub: "Запись через WhatsApp занимает меньше минуты",
            steps: [
                { num: "01", label: "Выберите процедуру ниже" },
                { num: "02", label: "Нажмите «Записаться в WhatsApp»" },
                { num: "03", label: "Подтвердите дату и время с нами" },
                { num: "04", label: "Приходите и наслаждайтесь" },
            ],
            directBtn: "Написать в WhatsApp",
            note: "Отвечаем в течение 15 минут · Ежедневно 9:00 – 21:00",
        },
        contact: {
            title: "Где нас найти",
            sub: "Мы в отеле — выходить за территорию не нужно",
            address: "TUI Magic Life Jacaranda\nJacaranda Beauty Bar\nÖlüdeniz, Fethiye, Türkiye",
            hours: "Ежедневно 09:00 – 21:00",
            whatsapp: "Написать в WhatsApp",
            scan: "Сканируйте для записи",
            scanNote: "Поделитесь с друзьями в отеле",
        },
        footer: {
            copy: "© 2025 Jacaranda Beauty Bar · TUI Magic Life Jacaranda · Ölüdeniz",
            privacy: "Политика конфиденциальности",
        },
    },
    en: {
        nav: {
            home: "Home",
            procedures: "Treatments",
            booking: "Book",
            about: "About",
            contact: "Contact",
        },
        hero: {
            hotelBadge: "TUI Magic Life Jacaranda · Ölüdeniz, Turkey",
            headline: "Relax by the sea —",
            headline2: "we take care of your skin",
            sub: "Professional dermatological skincare right inside your hotel. No need to go anywhere.",
            cta: "Book Now",
            scroll: "See treatments",
        },
        procedures: {
            title: "Our Treatments",
            sub: "Nine signature rituals for guests enjoying the sea and sun",
            bookBtn: "Book via WhatsApp",
            list: [
                {
                    name: "After-Sun Recovery",
                    desc: "Soothes irritated skin, reduces redness and restores the protective barrier after sun exposure. With aloe vera and panthenol — perfect for the first day after the beach.",
                    price: "from €45",
                    duration: "45 min",
                    tag: "Season Hit",
                },
                {
                    name: "Deep Hydration OXYjet",
                    desc: "Non-injection oxygen therapy saturates skin with oxygen and hyaluronic acid at cellular level. The face becomes smooth, firm and radiant — like after a spa holiday!",
                    price: "€90",
                    duration: "60 min",
                    tag: "Most Popular",
                },
                {
                    name: "Sensitive Skin Care",
                    desc: "Gentle cleansing and nourishment without aggression: we calm irritations and strengthen the protective barrier. Ideal for those who react to sun or pool chlorine.",
                    price: "€65",
                    duration: "50 min",
                },
                {
                    name: "Anti-Ageing Treatment",
                    desc: "Smooths wrinkles, improves tone and elasticity with peptides and collagen. Restore your skin's youthfulness and freshness — without pain or long recovery.",
                    price: "€85",
                    duration: "60 min",
                    tag: "Anti-Age",
                },
                {
                    name: "Deep Acne Cleansing",
                    desc: "Painless removal of inflammations, pore detox and antibacterial therapy. Skin is deeply cleansed, acne disappears, face becomes smooth and matte.",
                    price: "€70",
                    duration: "55 min",
                },
                {
                    name: "Classic Face Massage",
                    desc: "Relaxes muscles, improves blood flow and lymphatic drainage. The face lifts, puffiness reduces — 30 minutes of relaxation for a perfect contour.",
                    price: "€40",
                    duration: "30 min",
                },
                {
                    name: "Lymphatic Drainage Massage",
                    desc: "Removes puffiness, eliminates toxins and accelerates regeneration. Perfect after an active day — body feels light, skin looks clean and healthy.",
                    price: "€60",
                    duration: "45 min",
                },
                {
                    name: "Pressotherapy",
                    desc: "Compression apparatus massage for legs and body: fights cellulite, improves circulation and relieves fatigue. Ideal for beach walkers.",
                    price: "€55",
                    duration: "40 min",
                    tag: "Body",
                },
                {
                    name: "Fractional Pressotherapy",
                    desc: "Targeted impact on problem areas: deep detox, body sculpting and lymphatic drainage. The result — slimness and lightness without diets.",
                    price: "€75",
                    duration: "50 min",
                },
            ],
        },
        about: {
            title: "Jacaranda Beauty Bar",
            sub: "Your beauty salon right inside the hotel",
            body1: "We are located inside TUI Magic Life Jacaranda hotel in Ölüdeniz — one of the most beautiful resorts in Turkey. No need to go anywhere: just come down after the beach.",
            body2: "Our specialists combine European skincare techniques with warm Turkish hospitality. Every treatment is a personal ritual, never an assembly line.",
            body3: "Bright white interiors, soft pink lighting, scent of flowers and quiet music — you'll want to stay a little longer.",
            stats: [
                { num: "2,400+", label: "Happy Guests" },
                { num: "9", label: "Signature Treatments" },
                { num: "5★", label: "Guest Rating" },
                { num: "2014", label: "Est." },
            ],
        },
        booking: {
            title: "How to Book",
            sub: "Booking via WhatsApp takes under a minute",
            steps: [
                { num: "01", label: "Choose your treatment below" },
                { num: "02", label: 'Tap "Book via WhatsApp"' },
                { num: "03", label: "Confirm date & time with us" },
                { num: "04", label: "Come and enjoy" },
            ],
            directBtn: "Open WhatsApp",
            note: "We reply within 15 min · Daily 9:00 – 21:00",
        },
        contact: {
            title: "Find Us",
            sub: "We are inside the hotel — no need to leave the resort",
            address: "TUI Magic Life Jacaranda\nJacaranda Beauty Bar\nÖlüdeniz, Fethiye, Turkey",
            hours: "Daily 09:00 – 21:00",
            whatsapp: "Chat on WhatsApp",
            scan: "Scan to Book",
            scanNote: "Share with friends at the hotel",
        },
        footer: {
            copy: "© 2025 Jacaranda Beauty Bar · TUI Magic Life Jacaranda · Ölüdeniz",
            privacy: "Privacy Policy",
        },
    },
    tr: {
        nav: {
            home: "Ana Sayfa",
            procedures: "Tedaviler",
            booking: "Rezervasyon",
            about: "Hakkımızda",
            contact: "İletişim",
        },
        hero: {
            hotelBadge: "TUI Magic Life Jacaranda · Ölüdeniz, Türkiye",
            headline: "Denizde dinlenin —",
            headline2: "cildinizi bize bırakın",
            sub: "Otel içinde profesyonel dermatolojik cilt bakımı. Hiçbir yere gitmenize gerek yok.",
            cta: "Rezervasyon Yap",
            scroll: "Tedavileri gör",
        },
        procedures: {
            title: "Tedavilerimiz",
            sub: "Deniz ve güneşi seven misafirler için dokuz özel ritual",
            bookBtn: "WhatsApp ile Rezervasyon",
            list: [
                {
                    name: "Güneş Sonrası Bakım",
                    desc: "Güneş sonrası tahriş olan cildi yatıştırır, kızarıklıkları giderir ve koruyucu bariyeri yeniler. Aloe vera ve panthenol ile — plaj sonrası ilk gün için mükemmel.",
                    price: "€45'den",
                    duration: "45 dak",
                    tag: "Sezon Favorisi",
                },
                {
                    name: "Derin Nemlendirme OXYjet",
                    desc: "Enjeksiyonsuz oksijen terapisi, cildi hücresel düzeyde oksijen ve hyaluronik asit ile doyurur. Yüz pürüzsüz, sıkı ve parlak görünür!",
                    price: "€90",
                    duration: "60 dak",
                    tag: "En Popüler",
                },
                {
                    name: "Hassas Cilt Bakımı",
                    desc: "Nazik temizlik ve beslenme: tahriş olan cildi sakinleştirir, koruyucu bariyeri güçlendirir. Güneşe veya havuz kloru na tepki verenler için idealdir.",
                    price: "€65",
                    duration: "50 dak",
                },
                {
                    name: "Yaşlanma Karşıtı Bakım",
                    desc: "Peptitler ve kollajen ile kırışıklıkları düzeltir, tonu ve elastikiyeti iyileştirir. Acısız cildinize gençlik katın.",
                    price: "€85",
                    duration: "60 dak",
                    tag: "Anti-Age",
                },
                {
                    name: "Akne Derin Temizleme",
                    desc: "Ağrısız iltihap giderme, gözenek detoksu ve antibakteriyel terapi. Yüz pürüzsüz ve mat görünür.",
                    price: "€70",
                    duration: "55 dak",
                },
                {
                    name: "Klasik Yüz Masajı",
                    desc: "Kasları gevşetir, kan akışını ve lenf dolaşımını iyileştirir. Yüz sıkılaşır — mükemmel yüz konturu için 30 dakika rahatlama.",
                    price: "€40",
                    duration: "30 dak",
                },
                {
                    name: "Lenf Drenaj Masajı",
                    desc: "Ödemi giderir, toksinleri atar ve yenilemeyi hızlandırır. Aktif bir günden sonra harika — vücut hafif, cilt temiz hissedilir.",
                    price: "€60",
                    duration: "45 dak",
                },
                {
                    name: "Pressotherapy",
                    desc: "Basınçlı aparatlı masaj: selülitle savaşır, dolaşımı iyileştirir. Sahilde çok yürüyenler için idealdir.",
                    price: "€55",
                    duration: "40 dak",
                    tag: "Vücut",
                },
                {
                    name: "Fraksiyonel Pressotherapy",
                    desc: "Sorunlu bölgelere nokta atışı: derin detoks, vücut şekillendirme. Sonuç — diyet yapmadan incelik.",
                    price: "€75",
                    duration: "50 dak",
                },
            ],
        },
        about: {
            title: "Jacaranda Beauty Bar",
            sub: "Otel içinde güzellik salonunuz",
            body1: "Türkiye'nin en güzel tatil beldelerinden biri olan Ölüdeniz'deki TUI Magic Life Jacaranda oteli içindeyiz. Hiçbir yere gitmenize gerek yok.",
            body2: "Uzmanlarımız Avrupa cilt bakım tekniklerini sıcak Türk misafirperverliğiyle birleştirir.",
            body3: "Bembeyaz iç mekan, yumuşak pembe ışık — burada biraz daha kalmak isteyeceksiniz.",
            stats: [
                { num: "2.400+", label: "Mutlu Misafir" },
                { num: "9", label: "Özel Tedavi" },
                { num: "5★", label: "Misafir Puanı" },
                { num: "2014", label: "Kuruluş" },
            ],
        },
        booking: {
            title: "Nasıl Rezervasyon Yapılır",
            sub: "WhatsApp üzerinden rezervasyon bir dakikadan az sürer",
            steps: [
                { num: "01", label: "Aşağıdan tedavinizi seçin" },
                { num: "02", label: '"WhatsApp ile Rezervasyon" a tıklayın' },
                { num: "03", label: "Tarih ve saati bizimle onaylayın" },
                { num: "04", label: "Gelin ve keyfini çıkarın" },
            ],
            directBtn: "WhatsApp'ı Aç",
            note: "15 dakika içinde yanıt · Her gün 9:00 – 21:00",
        },
        contact: {
            title: "Bizi Bulun",
            sub: "Otel içindeyiz — tesisi terk etmenize gerek yok",
            address: "TUI Magic Life Jacaranda\nJacaranda Beauty Bar\nÖlüdeniz, Fethiye, Türkiye",
            hours: "Her gün 09:00 – 21:00",
            whatsapp: "WhatsApp'ta Yaz",
            scan: "Rezervasyon için Tara",
            scanNote: "Oteldeki arkadaşlarınızla paylaşın",
        },
        footer: {
            copy: "© 2025 Jacaranda Beauty Bar · TUI Magic Life Jacaranda · Ölüdeniz",
            privacy: "Gizlilik Politikası",
        },
    },
    de: {
        nav: {
            home: "Start",
            procedures: "Behandlungen",
            booking: "Buchen",
            about: "Über uns",
            contact: "Kontakt",
        },
        hero: {
            hotelBadge: "TUI Magic Life Jacaranda · Ölüdeniz, Türkei",
            headline: "Am Meer entspannen —",
            headline2: "wir kümmern uns um Ihre Haut",
            sub: "Professionelle Hautpflege direkt im Hotel. Kein Ausflug nötig.",
            cta: "Jetzt buchen",
            scroll: "Behandlungen ansehen",
        },
        procedures: {
            title: "Unsere Behandlungen",
            sub: "Neun Signature-Rituale für Gäste am Meer",
            bookBtn: "Via WhatsApp buchen",
            list: [
                {
                    name: "After-Sun Pflege",
                    desc: "Beruhigt gereizte Haut, reduziert Rötungen und stellt die Schutzbarriere wieder her. Mit Aloe vera und Panthenol — perfekt für den ersten Tag nach dem Strand.",
                    price: "ab €45",
                    duration: "45 Min",
                    tag: "Saison-Favorit",
                },
                {
                    name: "Tiefenfeuchtigkeitspflege OXYjet",
                    desc: "Injektionsfreie Sauerstofftherapie sättigt die Haut auf Zellebene mit Sauerstoff und Hyaluronsäure. Das Gesicht wird glatt, straff und strahlend!",
                    price: "€90",
                    duration: "60 Min",
                    tag: "Beliebt",
                },
                {
                    name: "Empfindliche Hautpflege",
                    desc: "Sanfte Reinigung ohne Aggression: wir beruhigen Reizungen und stärken die Schutzbarriere. Ideal für alle, die auf Sonne oder Chlor reagieren.",
                    price: "€65",
                    duration: "50 Min",
                },
                {
                    name: "Anti-Aging Behandlung",
                    desc: "Glättet Fältchen, verbessert Tonus und Elastizität mit Peptiden und Kollagen. Jugendlichkeit zurück — ohne Schmerz.",
                    price: "€85",
                    duration: "60 Min",
                    tag: "Anti-Age",
                },
                {
                    name: "Tiefenreinigung bei Akne",
                    desc: "Schmerzlose Entfernung von Entzündungen, Poren-Detox und antibakterielle Therapie. Haut wird tiefengereinigt.",
                    price: "€70",
                    duration: "55 Min",
                },
                {
                    name: "Klassische Gesichtsmassage",
                    desc: "Entspannt Muskeln, verbessert Durchblutung. Das Gesicht wird gestrafft — 30 Minuten Entspannung für ideale Konturen.",
                    price: "€40",
                    duration: "30 Min",
                },
                {
                    name: "Lymphdrainage-Massage",
                    desc: "Beseitigt Schwellungen, entgiftet und beschleunigt die Regeneration. Perfekt nach einem aktiven Tag.",
                    price: "€60",
                    duration: "45 Min",
                },
                {
                    name: "Pressotherapie",
                    desc: "Kompressionsmassage für Beine und Körper: bekämpft Cellulite und lindert Müdigkeit. Ideal für Strandwanderer.",
                    price: "€55",
                    duration: "40 Min",
                    tag: "Körper",
                },
                {
                    name: "Fraktionelle Pressotherapie",
                    desc: "Gezielter Einsatz an Problemzonen: Tief-Detox, Körpermodellierung. Schlankheit ohne Diät.",
                    price: "€75",
                    duration: "50 Min",
                },
            ],
        },
        about: {
            title: "Jacaranda Beauty Bar",
            sub: "Ihr Schönheitssalon direkt im Hotel",
            body1: "Wir befinden uns im Hotel TUI Magic Life Jacaranda in Ölüdeniz. Sie müssen nirgendwo hinfahren: kommen Sie einfach nach dem Strand.",
            body2: "Unsere Spezialisten verbinden europäische Pflegetechniken mit türkischer Gastfreundschaft.",
            body3: "Weißes Interieur, sanftes rosa Licht, Blumenduft — hier möchte man länger bleiben.",
            stats: [
                { num: "2.400+", label: "Zufriedene Gäste" },
                { num: "9", label: "Signature-Behandlungen" },
                { num: "5★", label: "Gästebewertung" },
                { num: "2014", label: "Gegründet" },
            ],
        },
        booking: {
            title: "Wie buchen",
            sub: "Buchung via WhatsApp in unter einer Minute",
            steps: [
                { num: "01", label: "Behandlung auswählen" },
                { num: "02", label: '"Via WhatsApp buchen" antippen' },
                { num: "03", label: "Datum & Uhrzeit bestätigen" },
                { num: "04", label: "Kommen und genießen" },
            ],
            directBtn: "WhatsApp öffnen",
            note: "Antwort in 15 Min · Täglich 9:00 – 21:00",
        },
        contact: {
            title: "Uns finden",
            sub: "Wir sind im Hotel — kein Verlassen des Resorts nötig",
            address: "TUI Magic Life Jacaranda\nJacaranda Beauty Bar\nÖlüdeniz, Fethiye, Türkei",
            hours: "Täglich 09:00 – 21:00",
            whatsapp: "WhatsApp schreiben",
            scan: "Zum Buchen scannen",
            scanNote: "Mit Hotelnachbarn teilen",
        },
        footer: {
            copy: "© 2025 Jacaranda Beauty Bar · TUI Magic Life Jacaranda · Ölüdeniz",
            privacy: "Datenschutz",
        },
    },
    fr: {
        nav: {
            home: "Accueil",
            procedures: "Soins",
            booking: "Réserver",
            about: "À propos",
            contact: "Contact",
        },
        hero: {
            hotelBadge: "TUI Magic Life Jacaranda · Ölüdeniz, Turquie",
            headline: "Profitez de la mer —",
            headline2: "nous prenons soin de votre peau",
            sub: "Soins dermatologiques professionnels à l'hôtel. Inutile de se déplacer.",
            cta: "Réserver",
            scroll: "Voir les soins",
        },
        procedures: {
            title: "Nos soins",
            sub: "Neuf rituels signature pour les vacanciers au bord de la mer",
            bookBtn: "Réserver via WhatsApp",
            list: [
                {
                    name: "Soin après-soleil",
                    desc: "Apaise la peau irritée, réduit les rougeurs et restaure la barrière protectrice. Avec aloe vera et panthénol — parfait pour le premier jour après la plage.",
                    price: "à partir de €45",
                    duration: "45 min",
                    tag: "Favori de la saison",
                },
                {
                    name: "Hydratation profonde OXYjet",
                    desc: "L'oxygénothérapie sans injection sature la peau en oxygène et en acide hyaluronique au niveau cellulaire. Le visage devient lisse et radieux!",
                    price: "€90",
                    duration: "60 min",
                    tag: "Populaire",
                },
                {
                    name: "Soin peau sensible",
                    desc: "Nettoyage en douceur sans agression: nous calmez les irritations et renforçons la barrière protectrice. Idéal pour ceux qui réagissent au soleil ou au chlore.",
                    price: "€65",
                    duration: "50 min",
                },
                {
                    name: "Soin anti-âge",
                    desc: "Lisse les rides, améliore le tonus et l'élasticité grâce aux peptides et au collagène. Redonnez jeunesse et fraîcheur à votre peau.",
                    price: "€85",
                    duration: "60 min",
                    tag: "Anti-Âge",
                },
                {
                    name: "Nettoyage profond anti-acné",
                    desc: "Élimination indolore des inflammations, détox des pores et thérapie antibactérienne. Le teint devient uniforme et mat.",
                    price: "€70",
                    duration: "55 min",
                },
                {
                    name: "Massage du visage classique",
                    desc: "Détend les muscles, améliore la circulation sanguine et lymphatique. Le visage se raffermit — 30 minutes de détente.",
                    price: "€40",
                    duration: "30 min",
                },
                {
                    name: "Drainage lymphatique",
                    desc: "Élimine les gonflements, évacue les toxines et accélère la régénération. Parfait après une journée active.",
                    price: "€60",
                    duration: "45 min",
                },
                {
                    name: "Pressothérapie",
                    desc: "Massage par compression pour les jambes et le corps: combat la cellulite et soulage la fatigue. Idéal pour ceux qui marchent sur la plage.",
                    price: "€55",
                    duration: "40 min",
                    tag: "Corps",
                },
                {
                    name: "Pressothérapie fractionnée",
                    desc: "Action ciblée sur les zones à problèmes: détox profond et sculpture de la silhouette. Minceur sans régime.",
                    price: "€75",
                    duration: "50 min",
                },
            ],
        },
        about: {
            title: "Jacaranda Beauty Bar",
            sub: "Votre salon de beauté à l'hôtel",
            body1: "Nous sommes à l'intérieur du TUI Magic Life Jacaranda à Ölüdeniz. Inutile de partir: descendez simplement après la plage.",
            body2: "Nos spécialistes allient techniques européennes de soins cutanés et hospitalité turque chaleureuse.",
            body3: "Intérieur blanc, lumière rose douce, parfum de fleurs — vous aurez envie de rester plus longtemps.",
            stats: [
                { num: "2 400+", label: "Clients satisfaits" },
                { num: "9", label: "Soins signature" },
                { num: "5★", label: "Note clients" },
                { num: "2014", label: "Fondé en" },
            ],
        },
        booking: {
            title: "Comment réserver",
            sub: "La réservation via WhatsApp prend moins d'une minute",
            steps: [
                { num: "01", label: "Choisissez votre soin ci-dessous" },
                { num: "02", label: 'Appuyez sur "Réserver via WhatsApp"' },
                { num: "03", label: "Confirmez date et heure" },
                { num: "04", label: "Venez et profitez" },
            ],
            directBtn: "Ouvrir WhatsApp",
            note: "Réponse sous 15 min · Tous les jours 9h–21h",
        },
        contact: {
            title: "Nous trouver",
            sub: "Nous sommes dans l'hôtel — inutile de quitter le complexe",
            address: "TUI Magic Life Jacaranda\nJacaranda Beauty Bar\nÖlüdeniz, Fethiye, Turquie",
            hours: "Tous les jours 09h00 – 21h00",
            whatsapp: "Écrire sur WhatsApp",
            scan: "Scanner pour réserver",
            scanNote: "Partagez avec vos voisins d'hôtel",
        },
        footer: {
            copy: "© 2025 Jacaranda Beauty Bar · TUI Magic Life Jacaranda · Ölüdeniz",
            privacy: "Politique de confidentialité",
        },
    },
};

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "905551234567"; // ← замени на реальный номер

const MSG: Record<SupportedLocale, (p: string) => string> = {
    ru: (p) =>
        `Здравствуйте! Хочу записаться на *${p}* в Jacaranda Beauty Bar. Подскажите доступное время.`,
    en: (p) =>
        `Hello! I'd like to book *${p}* at Jacaranda Beauty Bar. Please let me know available times.`,
    tr: (p) => `Merhaba! Jacaranda Beauty Bar'da *${p}* için rezervasyon yapmak istiyorum.`,
    de: (p) => `Hallo! Ich möchte *${p}* in der Jacaranda Beauty Bar buchen.`,
    fr: (p) => `Bonjour! Je souhaite réserver *${p}* à la Jacaranda Beauty Bar.`,
};

const waLink = (p: string, l: SupportedLocale) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MSG[l](p))}`;

const LOCALE_LABELS: Record<SupportedLocale, string> = {
    ru: "RU",
    en: "EN",
    tr: "TR",
    de: "DE",
    fr: "FR",
};

const GALLERY = [
    { src: "/salon/salon-reception-wide.jpeg", alt: "Reception & lounge" },
    { src: "/salon/room-full.jpeg", alt: "Treatment room" },
    { src: "/salon/salon-treatment-room.jpeg", alt: "Treatment chair" },
    { src: "/salon/salon-lanterns.jpeg", alt: "Interior decor" },
    { src: "/salon/salon-reception-front.jpeg", alt: "Reception desk" },
];

const CARD_BG = [
    "#fdf0f5",
    "#f0f8fd",
    "#fdf6f0",
    "#f0fdf6",
    "#fdf0fa",
    "#f5f0fd",
    "#fdf8f0",
    "#f0f5fd",
    "#fdf4f0",
];

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useVisible(): [React.RefObject<HTMLDivElement>, boolean] {
    const ref: any = useRef<HTMLDivElement>(null);
    const [v, setV] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (typeof IntersectionObserver === "undefined") {
            setV(true);
            return;
        }
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 30 && rect.bottom > 0) {
            setV(true);
            return;
        }
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e?.isIntersecting) {
                    setV(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.07, rootMargin: "0px 0px -30px 0px" },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return [ref, v];
}

function useScrolled(): boolean {
    const [s, setS] = useState(false);
    useEffect(() => {
        const fn = () => setS(window.scrollY > 55);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);
    return s;
}

// ─── ANIM WRAPPER ─────────────────────────────────────────────────────────────

const Anim: FC<{ children: ReactNode; className?: string; delay?: number }> = ({
    children,
    className = "",
    delay = 0,
}) => {
    const [ref, v] = useVisible();
    return (
        <div
            ref={ref}
            className={`${styles.anim} ${v ? styles.animIn : ""} ${className}`}
            style={{ transitionDelay: `${delay}s` }}
        >
            {children}
        </div>
    );
};

// ─── ICONS ───────────────────────────────────────────────────────────────────

const Wa: FC<{ size?: number }> = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

const Star: FC = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);

// ─── PROCEDURE CARD ───────────────────────────────────────────────────────────

const ProcCard: FC<{
    proc: ProcT;
    idx: number;
    lang: SupportedLocale;
    bookBtn: string;
}> = ({ proc, idx, lang, bookBtn }) => {
    const [ref, v] = useVisible();
    const [open, setOpen] = useState(false);
    return (
        <article
            ref={ref}
            className={`${styles.card} ${v ? styles.animIn : ""}`}
            style={{
                background: CARD_BG[idx % CARD_BG.length],
                transitionDelay: `${(idx % 3) * 0.07}s`,
            }}
        >
            <div className={styles.card__body}>
                <div className={styles.card__head}>
                    <h3 className={styles.card__name}>{proc.name}</h3>
                    {proc.tag && <span className={styles.card__tag}>{proc.tag}</span>}
                </div>
                <div className={styles.card__dur}>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden
                    >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12,6 12,12 16,14" />
                    </svg>
                    {proc.duration}
                </div>
                <p className={`${styles.card__desc} ${open ? styles.card__descOpen : ""}`}>
                    {proc.desc}
                </p>
                <button className={styles.card__toggle} onClick={() => setOpen((o) => !o)}>
                    {open ? "▲ Свернуть" : "▼ Подробнее"}
                </button>
            </div>
            <div className={styles.card__foot}>
                <span className={styles.card__price}>{proc.price}</span>
                <a
                    href={waLink(proc.name, lang)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnWa}
                >
                    <Wa /> {bookBtn}
                </a>
            </div>
        </article>
    );
};

// ─── MAIN ────────────────────────────────────────────────────────────────────

export default function SalonPage() {
    const [lang, setLang] = useState<SupportedLocale>("ru");
    const [menu, setMenu] = useState(false);
    const scrolled = useScrolled();
    const t = TR[lang];

    const go = (id: string) => {
        setMenu(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className={styles.page}>
            {/* FLOAT WA */}
            <a
                href={waLink("процедуру", lang)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.waFloat}
                aria-label="WhatsApp"
            >
                <Wa size={26} />
            </a>

            {/* ── NAVBAR ── */}
            <header className={`${styles.nav} ${scrolled ? styles.navSolid : ""}`}>
                <div className={styles.nav__in}>
                    <button className={styles.logo} onClick={() => go("home")}>
                        <span className={`${styles.logo__j} ${scrolled ? styles.logo__jPink : ""}`}>
                            𝒥
                        </span>
                        <div className={styles.logo__words}>
                            <span
                                className={`${styles.logo__name} ${scrolled ? styles.logo__nameDark : ""}`}
                            >
                                Jacaranda
                            </span>
                            <span
                                className={`${styles.logo__sub} ${scrolled ? styles.logo__subPink : ""}`}
                            >
                                beauty bar
                            </span>
                        </div>
                    </button>

                    <nav className={styles.deskNav}>
                        {(Object.keys(t.nav) as Array<keyof NavT>).map((k) => (
                            <button
                                key={k}
                                className={`${styles.deskNav__a} ${scrolled ? styles.deskNav__aDark : ""}`}
                                onClick={() => go(k)}
                            >
                                {t.nav[k]}
                            </button>
                        ))}
                    </nav>

                    <div className={styles.nav__right}>
                        <div className={`${styles.langs} ${scrolled ? styles.langsDark : ""}`}>
                            {(Object.keys(LOCALE_LABELS) as SupportedLocale[]).map((c) => (
                                <button
                                    key={c}
                                    className={`${styles.langBtn} ${lang === c ? (scrolled ? styles.langOnDark : styles.langOnLight) : ""}`}
                                    onClick={() => setLang(c)}
                                >
                                    {LOCALE_LABELS[c]}
                                </button>
                            ))}
                        </div>
                        <button
                            className={`${styles.burger} ${scrolled ? styles.burgerDark : ""}`}
                            onClick={() => setMenu((v) => !v)}
                        >
                            {menu ? (
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            ) : (
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                >
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <line x1="3" y1="12" x2="21" y2="12" />
                                    <line x1="3" y1="18" x2="21" y2="18" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {menu && (
                    <nav className={styles.mobileMenu}>
                        {(Object.keys(t.nav) as Array<keyof NavT>).map((k) => (
                            <button key={k} className={styles.mobileMenu__a} onClick={() => go(k)}>
                                {t.nav[k]}
                            </button>
                        ))}

                        <div
                            className={`${styles.langs} ${scrolled ? styles.langsDark : ""} ${styles.mobile}`}
                        >
                            {(Object.keys(LOCALE_LABELS) as SupportedLocale[]).map((c) => (
                                <button
                                    key={c}
                                    className={`${styles.langBtn} ${lang === c ? (scrolled ? styles.langOnDark : styles.langOnLight) : ""}`}
                                    onClick={() => setLang(c)}
                                >
                                    {LOCALE_LABELS[c]}
                                </button>
                            ))}
                        </div>
                    </nav>
                )}
            </header>

            {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
            <section id="home" className={styles.hero}>
                <div className={styles.hero__img}>
                    <Image
                        src="/salon/salon-reception-wide.jpeg"
                        alt="Jacaranda Beauty Bar"
                        fill
                        priority
                        style={{ objectFit: "cover", objectPosition: "center 30%" }}
                    />
                    <div className={styles.hero__veil} />
                </div>

                <div className={styles.hero__box}>
                    <p className={styles.hero__badge}>{t.hero.hotelBadge}</p>

                    <div className={styles.hero__logoBlock}>
                        <span className={styles.hero__bigJ}>𝒥</span>
                        <div>
                            <span className={styles.hero__bigName}>Jacaranda</span>
                            <span className={styles.hero__bigSub}>beauty bar</span>
                        </div>
                    </div>

                    <h1 className={styles.hero__h1}>
                        {t.hero.headline}
                        <br />
                        <em>{t.hero.headline2}</em>
                    </h1>
                    <p className={styles.hero__p}>{t.hero.sub}</p>

                    <div className={styles.hero__btns}>
                        <a
                            href={waLink("процедуру", lang)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.btnWaHero}
                        >
                            <Wa size={20} /> {t.hero.cta}
                        </a>
                        <button className={styles.hero__ghost} onClick={() => go("procedures")}>
                            {t.hero.scroll} →
                        </button>
                    </div>
                </div>

                <div className={styles.wave}>
                    <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
                        <path d="M0,30 C400,60 1040,0 1440,30 L1440,60 L0,60 Z" fill="#faf8f4" />
                    </svg>
                </div>
            </section>

            {/* ══ PROCEDURES ════════════════════════════════════════════════════════ */}
            <section id="procedures" className={styles.sec}>
                <div className={styles.wrap}>
                    <Anim className={styles.secHead}>
                        <span className={styles.line} />
                        <h2 className={styles.secTitle}>{t.procedures.title}</h2>
                        <p className={styles.secSub}>{t.procedures.sub}</p>
                    </Anim>
                    <div className={styles.procGrid}>
                        {t.procedures.list.map((p, i) => (
                            <ProcCard
                                key={p.name}
                                proc={p}
                                idx={i}
                                lang={lang}
                                bookBtn={t.procedures.bookBtn}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ BOOKING ═══════════════════════════════════════════════════════════ */}
            <section id="booking" className={styles.bookSec}>
                <div className={styles.bookBg} />
                <div className={styles.wrap}>
                    <Anim className={`${styles.secHead} ${styles.secHeadLight}`}>
                        <span className={`${styles.line} ${styles.lineLight}`} />
                        <h2 className={`${styles.secTitle} ${styles.secTitleLight}`}>
                            {t.booking.title}
                        </h2>
                        <p className={`${styles.secSub} ${styles.secSubLight}`}>{t.booking.sub}</p>
                    </Anim>
                    <div className={styles.steps}>
                        {t.booking.steps.map((s, i) => (
                            <Anim key={s.num} delay={i * 0.1} className={styles.step}>
                                <span className={styles.step__n}>{s.num}</span>
                                <p className={styles.step__l}>{s.label}</p>
                            </Anim>
                        ))}
                    </div>
                    <Anim className={styles.bookCta}>
                        <a
                            href={waLink("процедуру", lang)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.btnWaHero}
                        >
                            <Wa size={20} /> {t.booking.directBtn}
                        </a>
                        <p className={styles.bookNote}>{t.booking.note}</p>
                    </Anim>
                </div>
                <div className={styles.wave}>
                    <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
                        <path d="M0,30 C400,60 1040,0 1440,30 L1440,60 L0,60 Z" fill="#faf8f4" />
                    </svg>
                </div>
            </section>

            {/* ══ ABOUT ═════════════════════════════════════════════════════════════ */}
            <section id="about" className={styles.sec}>
                <div className={styles.wrap}>
                    <div className={styles.aboutGrid}>
                        <Anim className={styles.aboutTxt}>
                            <span className={styles.line} />
                            <h2 className={styles.secTitle}>{t.about.title}</h2>
                            <p className={styles.aboutSub}>{t.about.sub}</p>
                            <p className={styles.aboutP}>{t.about.body1}</p>
                            <p className={styles.aboutP}>{t.about.body2}</p>
                            <p className={`${styles.aboutP} ${styles.aboutItalic}`}>
                                {t.about.body3}
                            </p>
                            <div className={styles.stats}>
                                {t.about.stats.map((s) => (
                                    <div key={s.label} className={styles.stat}>
                                        <span className={styles.stat__n}>{s.num}</span>
                                        <span className={styles.stat__l}>{s.label}</span>
                                    </div>
                                ))}
                            </div>
                        </Anim>

                        {/* Photos collage */}
                        <div className={styles.photoCols}>
                            <Anim delay={0.1} className={styles.photoMain}>
                                <Image
                                    src="/salon/salon-reception-front.jpeg"
                                    alt="Reception"
                                    fill
                                    style={{ objectFit: "cover", borderRadius: "20px" }}
                                />
                            </Anim>
                            <div className={styles.photoSmalls}>
                                <Anim delay={0.2} className={styles.photoSm}>
                                    <Image
                                        src="/salon/room-full.jpeg"
                                        alt="Treatment room"
                                        fill
                                        style={{ objectFit: "cover", borderRadius: "14px" }}
                                    />
                                </Anim>
                                <Anim delay={0.3} className={styles.photoSm}>
                                    <Image
                                        src="/salon/salon-lanterns.jpeg"
                                        alt="Decor"
                                        fill
                                        style={{ objectFit: "cover", borderRadius: "14px" }}
                                    />
                                </Anim>
                            </div>
                        </div>
                    </div>

                    {/* Gallery strip */}
                    <Anim className={styles.gallery}>
                        {GALLERY.map((g, i) => (
                            <div key={i} className={styles.galItem}>
                                <Image
                                    src={g.src}
                                    alt={g.alt}
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                        ))}
                    </Anim>

                    {/* Reviews */}
                    <Anim className={styles.reviews}>
                        {[
                            {
                                name: "Анна К.",
                                flag: "🇷🇺",
                                text: "Записалась прямо из номера, пришла через час. Уход после загара — небо и земля! Кожа сразу успокоилась.",
                            },
                            {
                                name: "Emma L.",
                                flag: "🇬🇧",
                                text: "OXYjet treatment was amazing. Booked via WhatsApp in 2 minutes. Highly recommend to every hotel guest!",
                            },
                            {
                                name: "Hanna M.",
                                flag: "🇩🇪",
                                text: "Wunderbarer Salon direkt im Hotel. Gesichtsmassage war perfekt nach einem langen Strandtag.",
                            },
                        ].map((r, i) => (
                            <article key={i} className={styles.review}>
                                <div className={styles.review__stars}>
                                    {[...Array(5)].map((_, j) => (
                                        <Star key={j} />
                                    ))}
                                </div>
                                <p className={styles.review__txt}>{r.text}</p>
                                <span className={styles.review__who}>
                                    {r.flag} {r.name}
                                </span>
                            </article>
                        ))}
                    </Anim>
                </div>
            </section>

            {/* ══ CONTACT ═══════════════════════════════════════════════════════════ */}
            <section id="contact" className={`${styles.sec} ${styles.secBg}`}>
                <div className={styles.wrap}>
                    <Anim className={styles.secHead}>
                        <span className={styles.line} />
                        <h2 className={styles.secTitle}>{t.contact.title}</h2>
                        <p className={styles.secSub}>{t.contact.sub}</p>
                    </Anim>
                    <div className={styles.contactGrid}>
                        <Anim delay={0} className={styles.cCard}>
                            <span className={styles.cCard__ico}>📍</span>
                            <h3 className={styles.cCard__title}>TUI Magic Life Jacaranda</h3>
                            <p className={styles.cCard__addr}>{t.contact.address}</p>
                            <p className={styles.cCard__hrs}>🕐 {t.contact.hours}</p>
                        </Anim>

                        <Anim delay={0.1} className={styles.mapBox}>
                            <iframe
                                title="map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.0!2d29.1167!3d36.5467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c21a28a44fc903%3A0x5f4a9aeb7dc1ead7!2sTUI%20Magic%20Life%20Jacaranda!5e0!3m2!1sen!2str!4v1700000000"
                                width="100%"
                                height="100%"
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </Anim>

                        <Anim delay={0.2} className={styles.cCard}>
                            <span className={styles.cCard__ico}>💬</span>
                            <h3 className={styles.cCard__title}>WhatsApp</h3>
                            <a
                                href={waLink("процедуру", lang)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.btnWa}
                                style={{ marginBottom: 20 }}
                            >
                                <Wa /> {t.contact.whatsapp}
                            </a>
                            <div className={styles.qrRow}>
                                <div className={styles.qrBox} aria-label="QR Code" />
                                <div>
                                    <p className={styles.qrLabel}>{t.contact.scan}</p>
                                    <p className={styles.qrNote}>{t.contact.scanNote}</p>
                                </div>
                            </div>
                        </Anim>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className={styles.footer}>
                <span className={styles.footer__copy}>{t.footer.copy}</span>
                <button className={styles.footer__priv}>{t.footer.privacy}</button>
            </footer>
        </div>
    );
}
