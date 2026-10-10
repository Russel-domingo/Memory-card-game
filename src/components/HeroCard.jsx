function HeroCard(props) {
    return(
        <article className="hero-card" onClick={props.onClick}>
            <img 
            className="hero-image"
            src={props.imageUrl} 
            alt={props.hero.localized_name} />

            <div className="hero-info">
                <h2>{props.hero.localized_name}</h2>
                <p className="hero-attribute">
                    {props.hero.primary_attr.toUpperCase()} . {props.hero.attack_type}
                </p>
                <div className="hero-roles">
                    {props.hero.roles.slice(0, 2).map((role) => {
                        return <span className="role-tag" key={role}>{role}</span>
                    })}
                </div>
            </div>
        </article>
    )
}

export default HeroCard;