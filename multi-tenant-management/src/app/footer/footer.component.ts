import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  customCarouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      780: {
        items: 3
      },
      990: {
        items: 5
      }
    },
    nav: true
  }
  footerLinks = [
    {
      heading: 'NashTech',
      links: [
        {
          linkText: 'Contact us',
          linkUrl: '/home/contact-us',
        },
        {
          linkText: 'Careers',
          linkUrl: 'https://www.nashtechglobal.com/careers/',
        },
        {
          linkText: 'Our locations',
          linkUrl: 'https://www.nashtechglobal.com/contact-us/',
        },
      ],
    },
    {
      heading: 'Solutions',
      links: [
        {
          linkText: 'Our Solutions',
          linkUrl: 'https://www.nashtechglobal.com/our-solutions/',
        },
        {
          linkText: 'Industries',
          linkUrl: 'https://www.nashtechglobal.com/industries/',
        },
        {
          linkText: 'Our thinking',
          linkUrl: 'https://www.nashtechglobal.com/our-thinking/',
        },
      ],
    },
    {
      heading: 'Useful links',
      links: [
        {
          linkText: 'Privacy notice',
          linkUrl: 'https://www.nashtechglobal.com/privacy-policy',
        },
        {
          linkText: 'Modern slavery',
          linkUrl: 'https://www.nashsquared.com/about-us/modern-slavery',
        },
        {
          linkText: 'NashTech Accelerators',
          linkUrl: 'https://accelerator.nashtechglobal.com/',
        },
      ],
    },
    {
      heading: 'Contact with us',
      links: [
        {
          linkText: "<img class='icon-social' src = 'assets/linkedin.svg' alt='linkedin'> &nbsp; Linkedin",
          linkUrl: 'https://www.linkedin.com/company/nashtech-global/',
        },
        {
          linkText: "<img class='icon-social' src = 'assets/twitter.svg' alt='linkedin'> &nbsp; Twitter",
          linkUrl: 'https://twitter.com/nashtechhn',
        },
        {
          linkText: "<img class='icon-social' src = 'assets/facebook.svg' alt='linkedin'> &nbsp; Facebook",
          linkUrl: 'https://www.facebook.com/nashtechglobal/',
        },
      ],
    },
  ];

  partnersFooter = [
    { image: "https://www.nashtechglobal.com/wp-content/uploads/2023/03/Great-place-to-work.svg" },
    { image: "https://www.nashtechglobal.com/wp-content/uploads/2023/03/clutch-global.svg" },
    { image: "https://www.nashtechglobal.com/wp-content/uploads/2023/03/Intercert.svg" },
    { image: "https://www.nashtechglobal.com/wp-content/uploads/2023/03/IOSTQB.svg" },
    { image: "https://www.nashtechglobal.com/wp-content/uploads/2023/03/cmmi5-logo.svg" },
    { image: "https://www.nashtechglobal.com/wp-content/uploads/2023/03/ISO-9001.svg" },
    { image: "https://www.nashtechglobal.com/wp-content/uploads/2023/03/ISO-27001.svg" },
    { image: "https://www.nashtechglobal.com/wp-content/uploads/2023/03/ISO-27002.svg" }];

  constructor() { }

  ngOnInit(): void {
  }

}
