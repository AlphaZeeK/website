FROM netlify/build

ENV NETLIFY_REPO_URL="/opt/repo"
ENV NETLIFY_BUILD_BASE="/opt/buildhome"
ENV NETLIFY_REPO_DIR="$NETLIFY_BUILD_BASE/repo"

WORKDIR $NETLIFY_REPO_URL
COPY ./ ./
RUN mkdir -p $NETLIFY_REPO_DIR
RUN cp -p -r $NETLIFY_REPO_URL/* $NETLIFY_REPO_DIR/
RUN build "pwd && ./scripts/netlify.sh"
