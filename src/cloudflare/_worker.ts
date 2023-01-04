const apiUrl = "http://127.0.0.1:8000";

interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (!path.includes('.') && !path.slice(1).includes('/') && path !== "/" && path.length === 23) {
      const mainPage = await fetch(`${url.origin}/index.html`)
      return new HTMLRewriter()
        .on('#prefetch', new AddSheet(path))
        .on('meta[name="googlebot"', new IndexIfEmbedded())
        .transform(mainPage);
    } else {
      return env.ASSETS.fetch(request);
    }
  }
};

class AddSheet {
  path: string;
  constructor(path: string) {
    this.path = path;
  }
  element(element: Element) {
    element.setInnerContent(`prefetchedSheet = fetch('${apiUrl}/documents${this.path}');`);
  }
}

class IndexIfEmbedded {
  element(element: Element) {
    element.setAttribute("content", "noindex,indexifembedded");
  }
}
