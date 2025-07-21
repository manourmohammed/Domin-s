from concurrent.futures import ThreadPoolExecutor
import socket
import ssl
import time
from datetime import datetime
import whois
import requests
from bs4 import BeautifulSoup
from typing import List

class DomainService:

    @staticmethod
    def get_expiration(domain: str):
        try:
            info = whois.whois(domain)
            exp = info.expiration_date
            if isinstance(exp, list):
                exp = exp[0]
            return exp
        except Exception:
            return None

    @staticmethod
    def check_online(domain: str):
        try:
            socket.gethostbyname(domain)
            return True
        except Exception:
            return False

    @staticmethod
    def detect_status(exp):
        if exp is None:
            return "Inconnue"
        now = datetime.now()
        if exp < now:
            return "Expiré"
        elif (exp - now).days <= 15:
            return "Bientôt"
        else:
            return "Valide"

    @staticmethod
    def get_http_response(domain: str):
        url = f"https://{domain}"
        headers = {"User-Agent": "Mozilla/5.0"}
        try:
            return requests.get(url, headers=headers, timeout=7)
        except Exception:
            return None

    @staticmethod
    def detect_cms_from_html(html: str):
        if not html:
            return "Inaccessible"
        html = html.lower()
        if "wp-content" in html or "wp-includes" in html:
            return "WordPress"
        elif "index.php?option=" in html or "com_content" in html:
            return "Joomla"
        elif "sites/all/" in html or "drupal.js" in html:
            return "Drupal"
        elif "prestashop" in html or "blockcart" in html:
            return "PrestaShop"
        elif "mage/cookies.js" in html or "catalog/product/view" in html:
            return "Magento"
        elif ".myshopify.com" in html or "cdn.shopify.com" in html:
            return "Shopify"
        elif "static.parastorage.com" in html:
            return "Wix"
        elif "static.squarespace.com" in html:
            return "Squarespace"
        else:
            return "Inconnu"

    @staticmethod
    def detect_cms_details_from_html(domain: str, html: str):
        cms = "Inconnu"
        version = "-"
        theme = "-"
        plugins = "-"
        if not html:
            return domain, "Inaccessible", "-", "-", "-"
        html_lower = html.lower()
        soup = BeautifulSoup(html, 'html.parser')

        if "wp-content" in html_lower or "wp-includes" in html_lower:
            cms = "WordPress"
            meta_gen = soup.find("meta", attrs={"name": "generator"})
            if meta_gen and "wordpress" in meta_gen.get("content", "").lower():
                version = meta_gen["content"].split(" ")[-1]
            for link in soup.find_all("link", href=True):
                href = link["href"]
                if "/wp-content/themes/" in href:
                    theme = href.split("/wp-content/themes/")[1].split("/")[0]
                    break
            plugin_count = sum(1 for tag in soup.find_all(["script", "link"])
                               if (tag.get("src") or tag.get("href")) and "/wp-content/plugins/" in (tag.get("src") or tag.get("href")))
            plugins = str(plugin_count)

        elif "index.php?option=" in html_lower or "com_content" in html_lower:
            cms = "Joomla"
        elif "sites/all/" in html_lower or "drupal.js" in html_lower:
            cms = "Drupal"
        elif "prestashop" in html_lower or "blockcart" in html_lower:
            cms = "PrestaShop"
        elif "mage/cookies.js" in html_lower or "catalog/product/view" in html_lower:
            cms = "Magento"
        elif ".myshopify.com" in html_lower or "cdn.shopify.com" in html_lower:
            cms = "Shopify"
        elif "static.parastorage.com" in html_lower:
            cms = "Wix"
        elif "static.squarespace.com" in html_lower:
            cms = "Squarespace"

        return domain, cms, version, theme, plugins

    @staticmethod
    def get_ping(domain: str):
        url = f"https://{domain}"
        try:
            start = time.time()
            requests.get(url, timeout=5)
            end = time.time()
            return int((end - start) * 1000)
        except Exception:
            return None

    @staticmethod
    def get_http_status(response):
        if response:
            return f"{response.status_code} {response.reason}"
        else:
            return "Inaccessible"

    @staticmethod
    def get_ssl_expiration(domain: str):
        try:
            context = ssl.create_default_context()
            with socket.create_connection((domain, 443), timeout=5) as sock:
                with context.wrap_socket(sock, server_hostname=domain) as ssock:
                    cert = ssock.getpeercert()
                    expire_date_str = cert['notAfter']
                    expire_date = datetime.strptime(expire_date_str, '%b %d %H:%M:%S %Y %Z')
                    return expire_date.strftime('%d/%m/%Y')
        except Exception:
            return "Inaccessible"

    @staticmethod
    def get_whois_details(domain: str):
        try:
            info = whois.whois(domain)
            creation = info.creation_date
            registrar = info.registrar
            dns = info.name_servers
            if isinstance(creation, list): creation = creation[0]
            if isinstance(dns, list): dns = ", ".join(dns)
            return domain, creation.strftime('%Y-%m-%d') if creation else "-", registrar or "-", dns or "-"
        except:
            return domain, "-", "-", "-"

    
    @staticmethod
    def process_single_domain(domain: str) -> dict:
        expiration = DomainService.get_expiration(domain)
        online = DomainService.check_online(domain)
        status = DomainService.detect_status(expiration)
        response = DomainService.get_http_response(domain)
        html = response.text if response else None
        cms_simple = DomainService.detect_cms_from_html(html)
        domaine_cms, cms_detail, version, theme, plugins = DomainService.detect_cms_details_from_html(domain, html)
        ping = DomainService.get_ping(domain)
        ping_str = f"{ping} ms" if ping else "Inaccessible"
        http_status = DomainService.get_http_status(response)
        ssl_exp = DomainService.get_ssl_expiration(domain)
        domaine, creation, registrar, dns = DomainService.get_whois_details(domain)

        return {
            "domain": domain,
            "online": "✅" if online else "❌",
            "status": status,
            "expiration": expiration.strftime('%Y-%m-%d') if expiration else "Inconnue",
            "cms_simple": cms_simple,
            "cms_detail": {
                "cms": cms_detail,
                "version": version,
                "theme": theme,
                "plugins": plugins
            },
            "network": {
                "ping": ping_str,
                "http_status": http_status,
                "ssl_expiration": ssl_exp
            },
            "whois": {
                "creation": creation,
                "registrar": registrar,
                "dns": dns
            }
        }

    @staticmethod
    def process_domains(domains: List[str]) -> List[dict]:
        with ThreadPoolExecutor(max_workers=10) as executor:
            return list(executor.map(DomainService.process_single_domain, domains))