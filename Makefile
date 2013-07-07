# Module definitions
MODULE_FILES = main.js css.js hotkeys.js footer.js mods.js marcapaginas.js favicon.js botoneras.js userinfo.js nombres.js favoritos.js spy.js spoiler.js foros_fav.js antiguo.js foros.js tags.js blacklist.js usertools.js macros.js
MODULE_DIR = ./modules/
MODULES = $(addprefix $(MODULE_DIR), $(MODULE_FILES))

# Build options
FILE_OUT = mvusertools.user.js
DEV_DIR = ./debug
BUILD_DIR = ./build

KEEP_COMMENTS = --comments all
DEV_OPTIONS = --screw-ie8 --lint --beautify $(KEEP_COMMENTS) --output $(DEV_DIR)/$(FILE_OUT)
BUILD_OPTIONS = --screw-ie8 --compress --mangle $(KEEP_COMMENTS) --output $(BUILD_DIR)/$(FILE_OUT)

# Extension bundling options
FIREFOX_OUT = Firefox/resources/mv-usertools/data/
CHROME_OUT = Chrome/
#OPERA_OUT =
#SAFARI_OUT =

# Rules
.PHONY=all dev out firefox chrome opera safari
	
all: firefox chrome opera safari

dev: $(MODULES)
	uglifyjs $(MODULES) $(DEV_OPTIONS)
	cp $(DEV_DIR)/$(FILE_OUT) $(DEV_DIR)/$(FIREFOX_OUT)
	rm -f $(DEV_DIR)/mv-usertools.xpi
	cd $(DEV_DIR)/Firefox/; zip -9 -r mv-usertools.xpi .
	mv $(DEV_DIR)/Firefox/mv-usertools.xpi $(DEV_DIR)
	cp $(DEV_DIR)/$(FILE_OUT) $(DEV_DIR)/$(CHROME_OUT)
#       cp $(DEV_DIR)/$(FILE_OUT) $(DEV_DIR)/$(OPERA_OUT)
#       cp $(DEV_DIR)/$(FILE_OUT) $(DEV_DIR)/$(SAFARI_OUT)

$(BUILD_DIR)/$(FILE_OUT): $(MODULES)
	uglifyjs $(MODULES) $(OPTIONS)

firefox: $(BUILD_DIR)/$(FILE_OUT)
	$(error Firefox bundling not implemented!)
	cp $(BUILD_DIR)/$(FILE_OUT) $(BUILD_DIR)/$(FIREFOX_OUT)
	echo "TODO: Hacer bundle"

chrome: $(BUILD_DIR)/$(FILE_OUT)
	$(error Chrome bundling not implemented!)
	cp $(BUILD_DIR)/$(FILE_OUT) $(BUILD_DIR)/$(CHROME_OUT)
	echo "TODO: Hacer bundle"

opera: $(BUILD_DIR)/$(FILE_OUT)
	$(error Opera bundling not implemented!)
#       cp $(BUILD_DIR)/$(FILE_OUT) $(BUILD_DIR)/$(OPERA_OUT)
#       echo "TODO: Hacer bundle"

safari: $(BUILD_DIR)/$(FILE_OUT)
	$(error Safari bundling not implemented!)
#       cp $(BUILD_DIR)/$(FILE_OUT) $(BUILD_DIR)/$(SAFARI_OUT)
#       echo "TODO: Hacer bundle"
