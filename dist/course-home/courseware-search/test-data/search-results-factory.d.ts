export default searchResultsFactory;
declare function searchResultsFactory(searchKeywords?: string, moreInfo?: {}): {
    results: any;
    filters: any;
    total: any;
    maxScore: any;
    ms: any;
};
