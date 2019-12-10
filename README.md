# request-list-entities-vue-alpha-restful

Simple package responsible for providing a class that assists in the implementation of the object that contains all the necessary methods for the "list-entities-vue" API executes all search requests required for a backend made using the default route of "alpha-restful".

## Limitations

* Currently, the "searchDefault" function needs to be implemented externally by a class that inherits from this class provided here.

* The "searchSepAnd" option from "list-entity-vue" has not been implemented for this package.

* The "searchSepOr" option from "list-entity-vue" is available only for attributes that are array.
