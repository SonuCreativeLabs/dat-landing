<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap - Dreams Air Tech</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: #333;
            margin: 0;
            padding: 2rem;
          }
          a {
            color: #0EA5E9;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          table {
            border: none;
            border-collapse: collapse;
            width: 100%;
            margin: 2rem 0;
          }
          th {
            background-color: #0EA5E9;
            color: white;
            text-align: left;
            padding: 1rem;
            font-size: 14px;
            font-weight: 600;
          }
          td {
            padding: 0.8rem 1rem;
            border-bottom: 1px solid #eee;
            font-size: 14px;
          }
          tr:nth-child(even) td {
            background-color: #f9fafb;
          }
          tr:hover td {
            background-color: #f3f4f6;
          }
          h1 {
            color: #0EA5E9;
            font-size: 24px;
            margin-bottom: 1rem;
          }
          .header {
            background-color: white;
            padding: 1rem 0;
            margin-bottom: 2rem;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
          }
          .stats {
            margin: 1rem 0;
            color: #666;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Dreams Air Tech - XML Sitemap</h1>
            <div class="stats">
              <p>
                This sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs.
                Last updated: <xsl:value-of select="sitemap:urlset/sitemap:url[1]/sitemap:lastmod"/>
              </p>
            </div>
          </div>
          <table cellpadding="5">
            <tr>
              <th>URL</th>
              <th>Priority</th>
              <th>Change Frequency</th>
              <th>Last Modified</th>
            </tr>
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <tr>
                <td>
                  <a href="{sitemap:loc}">
                    <xsl:value-of select="sitemap:loc"/>
                  </a>
                </td>
                <td><xsl:value-of select="sitemap:priority"/></td>
                <td><xsl:value-of select="sitemap:changefreq"/></td>
                <td><xsl:value-of select="sitemap:lastmod"/></td>
              </tr>
            </xsl:for-each>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet> 