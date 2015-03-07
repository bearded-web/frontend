var dispatcher = require('../lib/dispatcher'),
    { scans } = require('../lib/api3'),
    { extractor } = require('../lib/helpers'),
    C = require('../constants');

module.exports = {

    /**
     * Fetch reports for scan, dispatch REPORTS_FETCH
     * @param {String} scan scan ID
     * @returns {Promise}
     */
    fetchScanReports: function(scan) {
        setTimeout(function() {
            dispatchReports(getFake().results);
        }, 200);
        // return scans.reports(scan)
        //     .then(extractor)
        //     .then(dispatchReports);
    },


    /**
     * Select severity level to show user
     * @param {String} severity
     */
    selectSeverity: function(severity) {
        dispatcher.dispatch(C.REPORTS_SEVERITY_SELECT, severity);
    }
};

function dispatchReports(reports) {
    dispatcher.dispatch(C.REPORTS_FETCH, {
        status: 'success',
        reports: reports
    });
}

function getFake() {
    return {
  "count": 2,
  "next": "",
  "previous": "",
  "results": [
   {
    "id": "54fb5a08fe57661176000069",
    "type": "multi",
    "created": "2015-03-07T15:05:28.342-05:00",
    "updated": "2015-03-07T15:05:28.342-05:00",
    "scan": "54fb59f4fe57661176000065",
    "scanSession": "54fb59f4fe57661176000064",
    "raw": "",
    "multi": [
     {
      "id": "54fb5a08fe5766117600006a",
      "type": "issues",
      "created": "2015-03-07T15:05:28.342-05:00",
      "updated": "2015-03-07T15:05:28.342-05:00",
      "scan": "54fb59f4fe57661176000065",
      "scanSession": "54fb59f4fe57661176000064",
      "raw": "",
      "issues": [
       {
        "severity": "high",
        "summary": "WordPress \u003c= 4.0 - Long Password Denial of Service (DoS)",
        "desc": "Fixed in: 4.0.1",
        "extras": [
         {
          "url": "https://wpvulndb.com/vulnerabilities/7681",
          "title": ""
         },
         {
          "url": "http://www.behindthefirewalls.com/2014/11/wordpress-denial-of-service-responsible-disclosure.html",
          "title": ""
         },
         {
          "url": "https://wordpress.org/news/2014/11/wordpress-4-0-1/",
          "title": ""
         },
         {
          "url": "http://web.nvd.nist.gov/view/vuln/detail?vulnId=CVE-2014-9034",
          "title": ""
         },
         {
          "url": "http://osvdb.org/114857",
          "title": ""
         },
         {
          "url": "http://www.rapid7.com/db/modules/auxiliary/dos/http/wordpress_long_password_dos",
          "title": ""
         },
         {
          "url": "http://www.exploit-db.com/exploits/35413/",
          "title": ""
         },
         {
          "url": "http://www.exploit-db.com/exploits/35414/",
          "title": ""
         }
        ]
       },
       {
        "severity": "medium",
        "summary": "WordPress \u003c= 4.0 - CSRF in wp-login.php Password Reset",
        "desc": "Fixed in: 4.0.1",
        "extras": [
         {
          "url": "https://wpvulndb.com/vulnerabilities/7691",
          "title": ""
         },
         {
          "url": "https://core.trac.wordpress.org/changeset/30418",
          "title": ""
         },
         {
          "url": "http://web.nvd.nist.gov/view/vuln/detail?vulnId=CVE-2014-9033",
          "title": ""
         }
        ]
       },
       {
        "severity": "medium",
        "summary": "WordPress \u003c= 4.0 - Server Side Request Forgery (SSRF)",
        "desc": "Fixed in: 4.0.1",
        "extras": [
         {
          "url": "https://wpvulndb.com/vulnerabilities/7696",
          "title": ""
         },
         {
          "url": "http://www.securityfocus.com/bid/71234",
          "title": ""
         },
         {
          "url": "https://core.trac.wordpress.org/changeset/30444",
          "title": ""
         },
         {
          "url": "http://web.nvd.nist.gov/view/vuln/detail?vulnId=CVE-2014-9038",
          "title": ""
         }
        ]
       },
       {
        "severity": "medium",
        "summary": "WordPress 3.9, 3.9.1, 3.9.2, 4.0 - XSS in Media Playlists",
        "desc": "Fixed in: 4.0.1",
        "extras": [
         {
          "url": "https://wpvulndb.com/vulnerabilities/7697",
          "title": ""
         },
         {
          "url": "https://core.trac.wordpress.org/changeset/30422",
          "title": ""
         },
         {
          "url": "http://web.nvd.nist.gov/view/vuln/detail?vulnId=CVE-2014-9032",
          "title": ""
         }
        ]
       },
       {
        "severity": "info",
        "summary": "Found robots.txt with interesting entries",
        "desc": "/ru/\n/wp-admin/\n*/xmlrpc.php\n*/wp-*.php\n*/trackback/\n*?wptheme=\n*?comments=\n*?replytocom\n*/comment-page-\n*?s=\n*/wp-content/\n*/p/\n*/movies/thm/\n*/wp-content/uploads/",
        "urls": [
         {
          "url": "'http://example.com/robots.txt"
         }
        ]
       }
      ]
     },
     {
      "id": "54fb5a08fe5766117600006b",
      "type": "raw",
      "created": "2015-03-07T15:05:28.342-05:00",
      "updated": "2015-03-07T15:05:28.342-05:00",
      "scan": "54fb59f4fe57661176000065",
      "scanSession": "54fb59f4fe57661176000064",
      "raw": "wait for connection\r\nHandle msg%!(EXTRA string=(*transport.Message)(0xc20800e060)({\r\n Id: (int) 8,\r\n Cmd: (transport.Cmd) 0,\r\n Data: (*json.RawMessage)(0xc20800e0e0)({\r\n  00000000  7b 22 4d 65 74 68 6f 64  22 3a 31 2c 22 47 65 74  |{\"Method\":1,\"Get|\r\n  00000010  50 6c 75 67 69 6e 56 65  72 73 69 6f 6e 73 22 3a  |PluginVersions\":|\r\n  00000020  22 22 2c 22 52 75 6e 50  6c 75 67 69 6e 22 3a 6e  |\"\",\"RunPlugin\":n|\r\n  00000030  75 6c 6c 2c 22 53 65 6e  64 52 65 70 6f 72 74 22  |ull,\"SendReport\"|\r\n  00000040  3a 6e 75 6c 6c 2c 22 44  6f 77 6e 6c 6f 61 64 46  |:null,\"DownloadF|\r\n  00000050  69 6c 65 22 3a 22 22 7d                           |ile\":\"\"}|\r\n })\r\n})\r\n)request config\r\nhandle with conf (*plan.Conf)(0xc20801ac80)({\r\n CommandArgs: (string) \"\",\r\n Target: (string) \"http://example.com\",\r\n TakeFiles: ([]*plan.File) {\r\n },\r\n SharedFiles: ([]*plan.SharedFile) {\r\n }\r\n})\r\n\r\nget tool\r\nrun wpscan\r\nwpscan finished\r\ntransofrm report\r\nsent\r\n"
     }
    ]
   },
   {
    "id": "54fb5a08fe57661176000068",
    "type": "raw",
    "created": "2015-03-07T15:05:28.077-05:00",
    "updated": "2015-03-07T15:05:28.077-05:00",
    "scan": "54fb59f4fe57661176000065",
    "scanSession": "54fb59fcfe57661176000067",
    "raw": "_______________________________________________________________\r\n        __          _______   _____                  \r\n        \\ \\        / /  __ \\ / ____|                 \r\n         \\ \\  /\\  / /| |__) | (___   ___  __ _ _ __  \r\n          \\ \\/  \\/ / |  ___/ \\___ \\ / __|/ _` | '_ \\ \r\n           \\  /\\  /  | |     ____) | (__| (_| | | | |\r\n            \\/  \\/   |_|    |_____/ \\___|\\__,_|_| |_|\r\n\r\n        WordPress Security Scanner by the WPScan Team \r\n                       Version 2.6\r\n          Sponsored by Sucuri - https://sucuri.net\r\n   @_WPScan_, @ethicalhack3r, @erwan_lr, pvdl, @_FireFart_\r\n_______________________________________________________________\r\n\r\n[i] Updating the Database ...\r\n[i] Update completed.\r\n[+] URL: http://example.com/\r\n[+] Started: Sat Mar  7 20:05:23 2015\r\n\r\n[+] robots.txt available under: 'http://example.com/robots.txt'\r\n[+] Interesting entry from robots.txt: /ru/\r\r\n[+] Interesting entry from robots.txt: /wp-admin/\r\r\n[+] Interesting entry from robots.txt: */xmlrpc.php\r\r\n[+] Interesting entry from robots.txt: */wp-*.php\r\r\n[+] Interesting entry from robots.txt: */trackback/\r\r\n[+] Interesting entry from robots.txt: *?wptheme=\r\r\n[+] Interesting entry from robots.txt: *?comments=\r\r\n[+] Interesting entry from robots.txt: *?replytocom\r\r\n[+] Interesting entry from robots.txt: */comment-page-\r\r\n[+] Interesting entry from robots.txt: *?s=\r\r\n[+] Interesting entry from robots.txt: */wp-content/\r\r\n[+] Interesting entry from robots.txt: */p/\r\r\n[+] Interesting entry from robots.txt: */movies/thm/\r\r\n[+] Interesting entry from robots.txt: */wp-content/uploads/\r\r\n[!] The WordPress 'http://example.com/readme.html' file exists exposing a version number\r\n[+] Interesting header: SERVER: nginx/1.6.2\r\n[+] Interesting header: X-POWERED-BY: HHVM/3.5.0\r\n[+] XML-RPC Interface available under: http://example.com/xmlrpc.php\r\n\r\n[+] WordPress version 4.0 identified from meta generator\r\n[!] 4 vulnerabilities identified from the version number\r\n\r\n[!] Title: WordPress \u003c= 4.0 - Long Password Denial of Service (DoS)\r\n    Reference: https://wpvulndb.com/vulnerabilities/7681\r\n    Reference: http://www.behindthefirewalls.com/2014/11/wordpress-denial-of-service-responsible-disclosure.html\r\n    Reference: https://wordpress.org/news/2014/11/wordpress-4-0-1/\r\n    Reference: http://web.nvd.nist.gov/view/vuln/detail?vulnId=CVE-2014-9034\r\n    Reference: http://osvdb.org/114857\r\n    Reference: http://www.rapid7.com/db/modules/auxiliary/dos/http/wordpress_long_password_dos\r\n    Reference: http://www.exploit-db.com/exploits/35413/\r\n    Reference: http://www.exploit-db.com/exploits/35414/\r\n[i] Fixed in: 4.0.1\r\n\r\n[!] Title: WordPress \u003c= 4.0 - CSRF in wp-login.php Password Reset\r\n    Reference: https://wpvulndb.com/vulnerabilities/7691\r\n    Reference: https://core.trac.wordpress.org/changeset/30418\r\n    Reference: http://web.nvd.nist.gov/view/vuln/detail?vulnId=CVE-2014-9033\r\n[i] Fixed in: 4.0.1\r\n\r\n[!] Title: WordPress \u003c= 4.0 - Server Side Request Forgery (SSRF)\r\n    Reference: https://wpvulndb.com/vulnerabilities/7696\r\n    Reference: http://www.securityfocus.com/bid/71234\r\n    Reference: https://core.trac.wordpress.org/changeset/30444\r\n    Reference: http://web.nvd.nist.gov/view/vuln/detail?vulnId=CVE-2014-9038\r\n[i] Fixed in: 4.0.1\r\n\r\n[!] Title: WordPress 3.9, 3.9.1, 3.9.2, 4.0 - XSS in Media Playlists\r\n    Reference: https://wpvulndb.com/vulnerabilities/7697\r\n    Reference: https://core.trac.wordpress.org/changeset/30422\r\n    Reference: http://web.nvd.nist.gov/view/vuln/detail?vulnId=CVE-2014-9032\r\n[i] Fixed in: 4.0.1\r\n\r\n[+] Enumerating plugins from passive detection ...\r\n | 1 plugins found:\r\n\r\n[+] Name: ulogin - v2.0.6\r\n |  Location: http://example.com/wp-content/plugins/ulogin/\r\n |  Readme: http://example.com/wp-content/plugins/ulogin/readme.txt\r\n\r\n[+] Finished: Sat Mar  7 20:05:28 2015\r\n[+] Memory used: 9.395 MB\r\n[+] Elapsed time: 00:00:04\r\n"
   }
  ]
 };
}